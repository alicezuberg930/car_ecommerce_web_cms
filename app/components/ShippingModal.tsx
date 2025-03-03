'use client'
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PATH } from '../common/path'
import { setIsLoadingOverlay } from '../services/common.slice'
import { useDispatch } from 'react-redux'
import { handleShippingAddressHook, readProvincesHook } from '../hooks/shipping.address.hook'
import { getDistricts, getWards } from '../services/api.service'
import { toast } from 'react-toastify'

const ShippingModal: React.FC<{ selectedShipping?: ShippingAddress, setSelected?: Dispatch<SetStateAction<ShippingAddress | null>> }> = ({ selectedShipping, setSelected }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { data: provinces, isLoading } = readProvincesHook()
    const [pickupDistricts, setPickupDistricts] = useState<District[]>([])
    const [pickupWards, setPickupWards] = useState<Ward[]>([])
    const [returnDistricts, setReturnDistricts] = useState<District[]>([])
    const [returnWards, setReturnWards] = useState<Ward[]>([])
    const handleShipping = handleShippingAddressHook()

    const handleShippingAddress = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // dispatch(setIsLoadingOverlay(true))
        const formData = new FormData(e.currentTarget)
        const objects = Object.fromEntries(formData.entries())
        let shippingAddress = {
            PickupAddress: {
                provinces: String(objects.pickupProvince).split('-')[1],
                districts: String(objects.pickupDistrict).split('-')[1],
                wards: String(objects.pickupWard),
                street: String(objects.pickupStreet),
            },
            ReturnAddress: {
                provinces: String(objects.returnProvince).split('-')[1],
                districts: String(objects.returnDistrict).split('-')[1],
                wards: objects.returnWard,
                street: objects.returnStreet
            },
            pick_name: objects.pickupName,
            pick_tel: objects.pickupTel,
            pick_email: objects.pickupEmail,
            return_name: objects.returnName,
            return_tel: objects.returnTel,
            return_email: objects.returnEmail,
        }
        if (selectedShipping != null) {
            handleShipping.mutate({ isUpdate: true, body: shippingAddress }, { onSuccess() { setSelected!(null) } })
        } else {
            handleShipping.mutate({ isUpdate: false, body: shippingAddress })
            router.push(PATH.SHIPPING)
        }
        dispatch(setIsLoadingOverlay(false))
    }

    const selectPickupCity = async (e: ChangeEvent<HTMLSelectElement>) => {
        try {
            const response = await getDistricts(e.currentTarget.value.split('-')[0])
            setPickupDistricts(response.data)
        } catch (error) {
            toast.error('Đã có lỗi xảy ra')
        }
    }

    const selectPickupDistrict = async (e: ChangeEvent<HTMLSelectElement>) => {
        try {
            const response = await getWards(e.currentTarget.value.split('-')[0])
            setPickupWards(response.data)
        } catch (error) {
            toast.error('Đã có lỗi xảy ra')
        }
    }

    const selectReturnCity = async (e: ChangeEvent<HTMLSelectElement>) => {
        try {
            const response = await getDistricts(e.currentTarget.value.split('-')[0])
            setReturnDistricts(response.data)
        } catch (error) {
            toast.error('Đã có lỗi xảy ra')
        }
    }

    const selectReturnDistrict = async (e: ChangeEvent<HTMLSelectElement>) => {
        try {
            const response = await getWards(e.currentTarget.value.split('-')[0])
            setReturnWards(response.data)
        } catch (error) {
            toast.error('Đã có lỗi xảy ra')
        }
    }

    return (
        <div className='w-full'>
            <div className='text-black'>
                <div className='bg-[#f5f5f5] p-3'>
                    <h3 className='font-semibold text-red-500'>{selectedShipping ? 'Sửa' : 'Thêm'} địa chỉ giao hàng</h3>
                </div>
                <div className='p-3'>
                    <form onSubmit={handleShippingAddress}>
                        <table className='w-full'>
                            <tbody>
                                <tr className='bg-[#347ab6] text-white'>
                                    <td></td>
                                    <td className='py-3 font-bold text-sm'>Địa chỉ nhận hàng</td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Tỉnh/Thành Phố<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <select defaultValue="" name='pickupProvince' className='border-gray-300 p-2 border rounded-md w-full outline-none' onChange={selectPickupCity}>
                                            <option value="" disabled>Chọn 1 thành phố</option>
                                            {isLoading ?
                                                <></> :
                                                provinces ? (provinces?.data as Province[]).map(province => {
                                                    return (
                                                        <option className={`text-lg`} key={province._id} value={`${province.id}-${province._id}`}>{province.name}</option>
                                                    )
                                                }) : <option value='' disabled>Không có dữ liệu</option>
                                            }
                                        </select>
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Quận/Huyện<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <select defaultValue="" name='pickupDistrict' className='border-gray-300 p-2 border rounded-md w-full outline-none' onChange={selectPickupDistrict}>
                                            <option value="" disabled>Chọn 1 quận</option>
                                            {
                                                pickupDistricts.length > 0 ? (pickupDistricts as District[]).map(district => {
                                                    return (
                                                        <option className={`text-lg`} key={district._id} value={`${district.id}-${district._id}`}>{district.name}</option>
                                                    )
                                                }) : <option value='' disabled>Không có dữ liệu</option>
                                            }
                                        </select>
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Phường/Xã<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <select className='border-gray-300 p-2 border rounded-md w-full outline-none' name='pickupWard'>
                                            {
                                                pickupWards.length > 0 ? (pickupWards as Ward[]).map(ward => {
                                                    return (
                                                        <option className={`text-lg`} key={ward._id} value={ward._id}>{ward.name}</option>
                                                    )
                                                }) : <option value='' disabled>Không có dữ liệu</option>
                                            }
                                        </select>
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Đường<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <input defaultValue={selectedShipping?.PickupAddress!.street} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' required autoComplete='off' name='pickupStreet' placeholder='Nhập số đường' />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Điện thoại nhận hàng<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <input defaultValue={selectedShipping?.pick_tel} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' required autoComplete='off' name='pickupTel' placeholder='Nhập điện thoại' />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Tên nhận hàng<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <input defaultValue={selectedShipping?.pick_name} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' required autoComplete='off' name='pickupName' placeholder='Nhập tên' />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Email nhận hàng<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <input defaultValue={selectedShipping?.pick_email} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' required autoComplete='off' name='pickupEmail' placeholder='Nhập email' />
                                    </td>
                                </tr>

                                <tr className='bg-[#347ab6] text-white'>
                                    <td></td>
                                    <td className='py-3 font-bold text-sm'>Địa chỉ trả hàng</td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Tỉnh/Thành Phố<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <select defaultValue="" name='returnProvince' className='border-gray-300 p-2 border rounded-md w-full outline-none' onChange={selectReturnCity}>
                                            <option value="" disabled>Chọn 1 thành phố</option>
                                            {isLoading ?
                                                <></> :
                                                provinces ? (provinces?.data as Province[]).map(province => {
                                                    return (
                                                        <option className={`text-lg`} key={province._id} value={`${province.id}-${province._id}`}>{province.name}</option>
                                                    )
                                                }) : <option value='' disabled>Không có dữ liệu</option>
                                            }
                                        </select>
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Quận/Huyện<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <select defaultValue="" name='returnDistrict' className='border-gray-300 p-2 border rounded-md w-full outline-none' onChange={selectReturnDistrict}>
                                            <option value="" disabled>Chọn 1 quận</option>
                                            {
                                                returnDistricts.length > 0 ? (returnDistricts as District[]).map(district => {
                                                    return (
                                                        <option className={`text-lg`} key={district._id} value={`${district.id}-${district._id}`}>{district.name}</option>
                                                    )
                                                }) : <option value='' disabled>Không có dữ liệu</option>
                                            }
                                        </select>
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Phường/Xã<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <select className='border-gray-300 p-2 border rounded-md w-full outline-none' name='returnWard'>
                                            {
                                                returnWards.length > 0 ? (returnWards as Ward[]).map(ward => {
                                                    return (
                                                        <option className={`text-lg`} key={ward._id} value={ward._id}>{ward.name}</option>
                                                    )
                                                }) : <option value='' disabled>Không có dữ liệu</option>
                                            }
                                        </select>
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Đường<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <input defaultValue={selectedShipping?.ReturnAddress!.street} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' required autoComplete='off' name='returnStreet' placeholder='Nhập số đường' />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Điện thoại trả hàng<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <input defaultValue={selectedShipping?.return_tel} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' required autoComplete='off' name='returnTel' placeholder='Nhập điện thoại' />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Tên trả hàng<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <input defaultValue={selectedShipping?.return_name} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' required autoComplete='off' name='returnName' placeholder='Nhập tên' />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Email nhận hàng<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <input defaultValue={selectedShipping?.return_email} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' required autoComplete='off' name='returnEmail' placeholder='Nhập email' />
                                    </td>
                                </tr>

                                <tr>
                                    <td></td>
                                    <td>
                                        <div className='space-x-3 font-bold text-md'>
                                            <input type='submit' className='bg-[#347ab6] p-3 rounded-md text-white outline-none' value='Xác Nhận' />
                                            <input type='reset' className='bg-[#eeeeee] p-3 rounded-md outline-none' value='Nhập Lại' />
                                            {selectedShipping ? <button onClick={() => setSelected!(null)} className='bg-[#eeeeee] p-3 rounded-md outline-none'>Đóng</button> : <></>}
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

export default ShippingModal