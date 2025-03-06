'use client'
import React, { Dispatch, FormEvent, SetStateAction } from "react"
import { uploadFilesHook } from "../hooks/common.hook"
import { setIsLoadingOverlay } from "../services/common.slice"
import { useDispatch } from "react-redux"
import { createCarTypeHook } from "../hooks/cartype.hook"

const CarTypeModal: React.FC<{ selectedCarType?: CarType, setSelected?: Dispatch<SetStateAction<CarType | null>> }> = ({ selectedCarType, setSelected }) => {
    const create = createCarTypeHook()
    // const update = updateBrandHook()
    // const uploadHook = uploadFilesHook()
    const dispatch = useDispatch()

    const handleCarType = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(setIsLoadingOverlay(true))
        const formData = new FormData(e.currentTarget)
        const cartype: CarType = Object.fromEntries(formData.entries()) // Convert FormData to an object
        if (selectedCarType != null) {
            // update.mutate({ cartype, id: selectedCarType._id! })
            // setSelected!(null)
        } else {
            create.mutate({ cartype })
        }
        dispatch(setIsLoadingOverlay(false))
    }

    return (
        <div className='w-full'>
            <div>
                <div className='bg-[#f5f5f5] p-3'>
                    <h3 className='font-semibold text-red-500'>{selectedCarType ? 'Sửa' : 'Thêm'} loại xe</h3>
                </div>
                <div className='p-3'>
                    <form onSubmit={handleCarType}>
                        <table className='w-full'>
                            <tbody>
                                <tr className='bg-[#347ab6] text-white'>
                                    <td></td>
                                    <td className='py-3 font-bold text-sm'>Thông tin loại xe</td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Tên loại xe<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <input defaultValue={selectedCarType?.name} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' required autoComplete='on' name="name" />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Mô tả<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <input defaultValue={selectedCarType?.description} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' required autoComplete='on' name="description" />
                                    </td>
                                </tr>

                                <tr>
                                    <td></td>
                                    <td>
                                        <div className='space-x-3 font-bold text-md'>
                                            <input type='submit' className='bg-[#347ab6] p-3 rounded-md text-white outline-none' value='Xác Nhận' />
                                            <input type='reset' className='bg-[#eeeeee] p-3 rounded-md outline-none' value='Nhập Lại' />
                                            {selectedCarType ? <button onClick={() => setSelected!(null)} className='bg-[#eeeeee] p-3 rounded-md outline-none'>Đóng</button> : <></>}
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

export default CarTypeModal