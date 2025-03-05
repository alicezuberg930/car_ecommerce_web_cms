import React, { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"
import { uploadFilesHook } from "../hooks/common.hooks"
import { toast } from "react-toastify"
import CustomImagePicker from "./CustomImagePicker"
import { useRouter } from "next/navigation"
import { PATH } from "../common/path"
import { setIsLoadingOverlay } from "../services/common.slice"
import { useDispatch } from "react-redux"
import { createBannerHook, updateBannerHook } from "../hooks/banner.hook"

const BannerModal: React.FC<{ selectedBanner?: Banner, setSelected?: Dispatch<SetStateAction<Banner | null>> }> = ({ selectedBanner, setSelected }) => {
    const [images, setImages] = useState<{ file: File | null, url: string }[]>([])
    const create = createBannerHook()
    const update = updateBannerHook()
    const uploadHook = uploadFilesHook()
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        if (selectedBanner && selectedBanner.imageUrl) {
            let selectedImages: { file: File | null, url: string }[] = []
            selectedBanner.imageUrl.forEach(image => {
                selectedImages.push({ file: null, url: image })
            })
            setImages(selectedImages)
        }
    }, [selectedBanner])

    const handleBrand = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(setIsLoadingOverlay(true))
        const formData = new FormData(e.currentTarget)
        const banner: Banner = Object.fromEntries(formData.entries())
        let tempImages = images.map(image => image.url)
        // if (images[0].file != null) {
        //     for (let i = 0; i < images.length; i++) {
        //         formData.set('file', images[0].file!)
        //         await new Promise(resolve => {
        //             uploadHook.mutate({ file: formData }, {
        //                 onSuccess(data) {
        //                     tempImages = data.url
        //                     resolve(null)
        //                 }
        //             })
        //         })
        //     }
        // }
        banner["imageUrl"] = ["https://tse3.mm.bing.net/th?id=OIP.doZG3FI3PhAgphVd57FONgHaEK&pid=Api&P=0&h=180"]
        // banner["imageUrl"] = tempImages
        if (selectedBanner != null) {
            update.mutate({ banner, id: selectedBanner._id! })
            setSelected!(null)
        } else {
            create.mutate({ banner })
            router.push(PATH.BANNERS)
        }
        dispatch(setIsLoadingOverlay(false))
    }

    return (
        <div className='w-full'>
            <div className='text-black'>
                <div className='bg-[#f5f5f5] p-3'>
                    <h3 className='font-semibold text-red-500'>{selectedBanner ? 'Sửa' : 'Thêm'} banner</h3>
                </div>
                <div className='p-3'>
                    <form onSubmit={handleBrand}>
                        <table className='w-full'>
                            <tbody>
                                <tr className='bg-[#347ab6] text-white'>
                                    <td></td>
                                    <td className='py-3 font-bold text-sm'>Thông tin banner</td>
                                </tr>

                                {/* <tr>
                                    <td className='py-3 w-32'>Tên thương hiệu<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <input defaultValue={selectedBrand?.name} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' required autoComplete='off' name="name" />
                                    </td>
                                </tr> */}
                                <tr>
                                    <td className='py-3 w-32'>Hình</td>
                                    <td className='py-3'>
                                        <div className='mb-2'>
                                            <CustomImagePicker setImages={setImages} images={images} isMultiple={false} id="banner" />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <div className='space-x-3 font-bold text-md'>
                                            <input type='submit' className='bg-[#347ab6] p-3 rounded-md text-white outline-none' value='Xác Nhận' />
                                            <input type='reset' className='bg-[#eeeeee] p-3 rounded-md outline-none' value='Nhập Lại' />
                                            {selectedBanner ? <button onClick={() => setSelected!(null)} className='bg-[#eeeeee] p-3 rounded-md outline-none'>Đóng</button> : <></>}
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

export default BannerModal