"use client"
import CustomDatePicker from "@/app/components/CustomDatePicker"
import { readProductsHook } from "@/app/hooks/product.hooks"
import { readUserHook } from "@/app/hooks/user.hooks"
import { createVoucherHook } from "@/app/hooks/voucher.hook"
import { setIsLoadingOverlay } from "@/app/services/common.slice"
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useDispatch } from "react-redux"

const NewVoucherPage: React.FC = () => {
    const create = createVoucherHook()
    const dispatch = useDispatch()
    const { data: products, isLoading: loadingProducts } = readProductsHook(1, Infinity)
    const { data: users, isLoading: loadingUsers } = readUserHook(1, Infinity, "user")
    const [applicableProducts, setApplicableProducts] = useState<string[]>([])
    const [applicableUsers, setApplicableUsers] = useState<string[]>([])

    const handleCreateVoucher = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(setIsLoadingOverlay(true))
        const formData = new FormData(e.currentTarget)
        const entries = Object.fromEntries(formData.entries())
        const products = applicableProducts.map(product => product.split('-')[0])
        const users = applicableUsers.map(user => user.split('-')[0])
        let voucher: Voucher = { ...entries, applicableProducts: products, applicableUsers: users }
        create.mutate(voucher)
        dispatch(setIsLoadingOverlay(false))
    }

    const handleSelectProduct = (e: ChangeEvent<HTMLSelectElement>) => {
        setApplicableProducts(prev => {
            if (prev.find(p => p === e.target.value)) return prev
            else return [...prev, e.target.value]
        })
    }

    const handleSelectUser = (e: ChangeEvent<HTMLSelectElement>) => {
        setApplicableUsers(prev => {
            if (prev.find(p => p === e.target.value)) return prev
            else return [...prev, e.target.value]
        })
    }

    return (
        <div className='w-full'>
            <div className='text-black'>
                <div className='bg-[#f5f5f5] p-3'>
                    <h3 className='font-semibold text-red-500'>Thêm mã khuyến mãi</h3>
                </div>
                <div className='p-3'>
                    <form onSubmit={handleCreateVoucher}>
                        <table className='w-full'>
                            <tbody>
                                <tr className='bg-[#347ab6] text-white'>
                                    <td></td>
                                    <td className='py-3 font-bold text-sm'>Thông tin mã khuyến mãi</td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Mã khuyến mãi<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <input className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='text' required autoComplete='off' name="voucherCode" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-3 w-32'>Loại khuyến mãi<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <select className='border-gray-300 p-2 border rounded-md w-full outline-none' name="discountType">
                                            <option value='percentage'>Phần trăm</option>
                                            <option value='fixedamount'>Cố định</option>
                                            <option value='freeshipping'>Vận chuyển</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-3 w-32'>Giá trị<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <input className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='number' required autoComplete='off' name="discountValue" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-3 w-32'>Ngày bắt đầu<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <CustomDatePicker name="startDate" />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Ngày kết thúc<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <CustomDatePicker name="endDate" />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Lượt dùng<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <input className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' type='number' required autoComplete='off' name="usageLimit" />
                                    </td>
                                </tr>

                                <tr className='bg-[#347ab6] text-white'>
                                    <td></td>
                                    <td className='py-3 font-bold text-sm'>Áp dụng với các sản phẩm</td>
                                </tr>

                                <tr>
                                    <td className="py-3 w-32"></td>
                                    <td className='py-3 font-bold text-sm flex flex-wrap gap-3'>
                                        {
                                            applicableProducts.length > 0 && applicableProducts.map(product => {
                                                return (
                                                    <div className="rounded-md bg-blue-300 p-2 text-white" key={product}>
                                                        {product.split('-')[1]}
                                                    </div>
                                                )
                                            })
                                        }
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Chọn sản phẩm<b className='text-red-500'>*</b></td>
                                    <td className='py-3'>
                                        <select onChange={handleSelectProduct} className='border-gray-300 p-2 border rounded-md w-full outline-none'>
                                            {loadingProducts ?
                                                <option value="" disabled>Không có dữ liệu</option> :
                                                products && (products?.data.products as Product[]).map(product => {
                                                    return (
                                                        <option className={`text-lg`} key={`${product._id}`} value={`${product._id}-${product.name}`}>{product.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </td>
                                </tr>

                                <tr className='bg-[#347ab6] text-white'>
                                    <td></td>
                                    <td className='py-3 font-bold text-sm'>Áp dụng với các người dùng (không bắt buộc)</td>
                                </tr>

                                <tr>
                                    <td className="py-3 w-32"></td>
                                    <td className='py-3 font-bold text-sm flex flex-wrap gap-3'>
                                        {
                                            applicableUsers.length > 0 && applicableUsers.map(user => {
                                                return (
                                                    <div className="rounded-md bg-blue-300 p-2 text-white" key={user}>
                                                        {user.split('-')[1]}
                                                    </div>
                                                )
                                            })
                                        }
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-3 w-32'>Chọn người dùng</td>
                                    <td className='py-3'>
                                        <select onChange={handleSelectUser} className='border-gray-300 p-2 border rounded-md w-full outline-none'>
                                            {loadingUsers ?
                                                <option value="" disabled>Không có dữ liệu</option> :
                                                users && <>
                                                    <option value="" disabled>Chọn 1 người dùng</option>
                                                    {
                                                        (users?.data.users as User[])?.filter(e => !e.isAdmin).map(user => {
                                                            return (
                                                                <option className={`text-lg`} key={`${user._id}`} value={`${user._id}-${user.name}`}>{user.name}</option>
                                                            )
                                                        })
                                                    }
                                                </>
                                            }
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

export default NewVoucherPage