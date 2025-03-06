"use client"
import { createNewsHook, updateNewsHook } from "@/app/hooks/new.hook"
import { setIsLoadingOverlay } from "@/app/services/common.slice"
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import CustomImagePicker from "./CustomImagePicker"
import { uploadFileHook } from "../hooks/common.hook"

const NewsModal: React.FC<{ selectedNew?: New, setSelected?: Dispatch<SetStateAction<New | null>> }> = ({ selectedNew, setSelected }) => {
    const create = createNewsHook()
    const update = updateNewsHook()
    const dispatch = useDispatch()
    const upload = uploadFileHook()
    const [images, setImages] = useState<{ file: File | null, url: string }[]>([])

    useEffect(() => {
        if (selectedNew !== undefined) {
            if (selectedNew.images!.length > 0) {
                const detailImages: { file: File | null, url: string }[] = []
                for (let i = 0; i < selectedNew.images!.length; i++) {
                    detailImages.push({ file: null, url: selectedNew.images![i] })
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
        const n: New = Object.fromEntries(formData.entries())
        n['images'] = tempImages
        if (selectedNew !== undefined) {
            update.mutate({ n, id: selectedNew._id! })
            setSelected!(null)
        } else {
            create.mutate({ n })
        }
        dispatch(setIsLoadingOverlay(false))
    }

    return (
        <div className='w-full'>
            <div className='text-black'>
                <div className='bg-[#f5f5f5] p-3'>
                    <h3 className='font-semibold text-red-500'>{selectedNew ? 'Sửa' : 'Thêm'} tin tức</h3>
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
                                    <td className='py-3 w-32'>Tiêu đề<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <input className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' required name="title" defaultValue={selectedNew?.title ?? ""} />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Nội dung<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <textarea rows={5} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' required name="content" defaultValue={selectedNew?.content ?? ""} />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Ảnh</td>
                                    <td className='py-3'>
                                        <div className='mb-2'>
                                            <CustomImagePicker setImages={setImages} images={images} isMultiple={false} id="images" />
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Category<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <select defaultValue={selectedNew?.category} className='border-gray-300 p-2 border rounded-md w-full outline-none' name="category">
                                            <option value='review'>Xem xét</option>
                                            <option value='topsellingcars'>Top bán</option>
                                            <option value='event'>Sự kiện</option>
                                            <option value='guide'>Hướng dẫn</option>
                                        </select>
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32' defaultValue={selectedNew?.tags ?? ""}>Tags<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <select defaultValue={selectedNew?.category} className='border-gray-300 p-2 border rounded-md w-full outline-none' name="tags">
                                            <option value='hot'>Nóng</option>
                                            <option value='review'>Xem xét</option>
                                            <option value='new'>Tin mới</option>
                                        </select>
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Đăng lên<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <select defaultValue={String(selectedNew?.published) ?? 'false'} className='border-gray-300 p-2 border rounded-md w-full outline-none' name="published">
                                            <option value='true'>Đăng</option>
                                            <option value='false'>Không đăng</option>
                                        </select>
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

export default NewsModal