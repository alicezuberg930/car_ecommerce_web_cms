"use client"
import { updateNewsHook } from "@/app/hooks/new.hook"
import { setIsLoadingOverlay } from "@/app/services/common.slice"
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import CustomImagePicker from "./CustomImagePicker"
import { createImageHook, updateImageHook } from "../hooks/image.hook"
import { uploadFileHook } from "../hooks/common.hook"

const ImageModal: React.FC<{ selectedImage?: Image, setSelected?: Dispatch<SetStateAction<New | null>> }> = ({ selectedImage, setSelected }) => {
    const create = createImageHook()
    const update = updateImageHook()
    const dispatch = useDispatch()
    const upload = uploadFileHook()
    const [images, setImages] = useState<{ file: File | null, url: string }[]>([])

    useEffect(() => {
        if (selectedImage !== undefined) {
            if (selectedImage.url!.length > 0) {
                const detailImages: { file: File | null, url: string }[] = []
                for (let i = 0; i < selectedImage.url!.length; i++) {
                    detailImages.push({ file: null, url: selectedImage.url![i] })
                }
                setImages(detailImages)
            }
        }
    }, [])

    const handleCreateNew = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(setIsLoadingOverlay(true))
        const formData = new FormData(e.currentTarget)
        let tempImages = images.map(image => image.url)
        if (images.length > 0) {
            const file = new FormData()
            for (let i = 0; i < images.length; i++) {
                if (images[i].file != null) {
                    file.set('file', images[i].file!)
                    await new Promise((resolve) => {
                        upload.mutate({ file }, {
                            onSuccess(data) {
                                tempImages[i] = data.url
                                resolve(null);
                            }
                        })
                    })
                }
            }
        }
        formData.delete('file')
        const image: Image = Object.fromEntries(formData.entries())
        image['url'] = tempImages
        if (selectedImage !== undefined) {
            update.mutate({ image, id: selectedImage._id! })
            setSelected!(null)
        } else {
            create.mutate({ image })
        }
        dispatch(setIsLoadingOverlay(false))
    }

    return (
        <div className='w-full'>
            <div className='text-black'>
                <div className='bg-[#f5f5f5] p-3'>
                    <h3 className='font-semibold text-red-500'>{selectedImage ? 'Sửa' : 'Thêm'} hình ảnh</h3>
                </div>
                <div className='p-3'>
                    <form onSubmit={handleCreateNew}>
                        <table className='w-full'>
                            <tbody>
                                <tr className='bg-[#347ab6] text-white'>
                                    <td></td>
                                    <td className='py-3 font-bold text-sm'>Thông tin tin tức</td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Trạng thái<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <select defaultValue={selectedImage?.status ?? "bought"} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' name='status'>
                                            <option value="bought">Đã mua</option>
                                            <option value="sold">Đã bán</option>
                                        </select>
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Ảnh</td>
                                    <td className='py-3'>
                                        <div className='mb-2'>
                                            <CustomImagePicker setImages={setImages} images={images} isMultiple={true} id="images" />
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td></td>
                                    <td>
                                        <div className='space-x-3 font-bold text-md'>
                                            <input type='submit' className='bg-[#347ab6] p-3 rounded-md text-white outline-none' value='Xác Nhận' />
                                            <input type='reset' className='bg-[#eeeeee] p-3 rounded-md outline-none' value='Nhập Lại' />
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

export default ImageModal