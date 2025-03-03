import React, { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"
import { uploadFilesHook } from "../hooks/common.hooks"
import CustomImagePicker from "./CustomImagePicker"
import { setIsLoadingOverlay } from "../services/common.slice"
import { useDispatch } from "react-redux"
import { createBrandHook, updateBrandHook } from "../hooks/brand.hook"

const BrandModal: React.FC<{ selectedBrand?: Brand, setSelected?: Dispatch<SetStateAction<Brand | null>> }> = ({ selectedBrand, setSelected }) => {
    const [images, setImages] = useState<{ file: File | null, url: string }[]>([])
    const create = createBrandHook()
    const update = updateBrandHook()
    // const uploadHook = uploadFilesHook()
    const dispatch = useDispatch()

    useEffect(() => {
        if (selectedBrand && selectedBrand.logo) setImages([{ file: null, url: selectedBrand.logo }])
    }, [selectedBrand])

    const handleBrand = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(setIsLoadingOverlay(true))
        const formData = new FormData(e.currentTarget)
        const brand: Brand = Object.fromEntries(formData.entries()) // Convert FormData to an object
        // if (images[0].file != null) {
        //     formData.set('file', images[0].file!)
        //     await new Promise(resolve => {
        //         uploadHook.mutate(formData, {
        //             onSuccess(data) {
        //                 brand["logo"] = data.url
        //                 resolve(null)
        //             }
        //         })
        //     })
        // } else {
        brand['logo'] = "https://www.hdwallpaperspulse.com/wp-content/uploads/2014/02/07/Toyota-Logo-Black-Background-copy.jpg"
        // images[0].url
        // }
        if (selectedBrand != null) {
            update.mutate({ brand, id: selectedBrand._id! })
            setSelected!(null)
        } else {
            create.mutate({ brand })
        }
        dispatch(setIsLoadingOverlay(false))
    }

    return (
        <div className='w-full'>
            <div>
                <div className='bg-[#f5f5f5] p-3'>
                    <h3 className='font-semibold text-red-500'>{selectedBrand ? 'Sửa' : 'Thêm'} thương hiệu</h3>
                </div>
                <div className='p-3'>
                    <form onSubmit={handleBrand}>
                        <table className='w-full'>
                            <tbody>
                                <tr className='bg-[#347ab6] text-white'>
                                    <td></td>
                                    <td className='py-3 font-bold text-sm'>Thông tin thương hiệu</td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Tên thương hiệu<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <input defaultValue={selectedBrand?.name} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' required autoComplete='on' name="name" />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Xuất xứ quốc gia<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <input defaultValue={selectedBrand?.country} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' required autoComplete='on' name="country" />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Logo</td>
                                    <td className='py-3'>
                                        <div className='mb-2'>
                                            <CustomImagePicker setImages={setImages} images={images} isMultiple={false} id="brand" />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <div className='space-x-3 font-bold text-md'>
                                            <input type='submit' className='bg-[#347ab6] p-3 rounded-md text-white outline-none' value='Xác Nhận' />
                                            <input type='reset' className='bg-[#eeeeee] p-3 rounded-md outline-none' value='Nhập Lại' />
                                            {selectedBrand ? <button onClick={() => setSelected!(null)} className='bg-[#eeeeee] p-3 rounded-md outline-none'>Đóng</button> : <></>}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BrandModal