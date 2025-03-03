'use client'
import { icons } from '@/app/common/icons'
import { PATH } from '@/app/common/path'
import { formatVND } from '@/app/common/utils'
import CustomDatePicker from '@/app/components/CustomDatePicker'
import LoadingShimmer from '@/app/components/LoadingShimmer'
import { readOrdersHook, updateOrderHook } from '@/app/hooks/order.hooks'
import moment from 'moment'
import Link from 'next/link'
import { useRef, useState } from 'react'

const NewOrdersPage: React.FC = () => {
    const { FaRegShareSquare, FaChevronDown, FaFilter } = icons
    const filterRef = useRef<HTMLDivElement>(null)
    const { data: orders, isLoading } = readOrdersHook()

    const dummy: number[] = []
    for (let i = 0; i <= 100; i++) {
        dummy.push(i)
    }

    const orderStatusBg: Record<string, string> = {
        'pending': 'bg-blue-300',
        'processing': 'bg-[#5eb95b]'
    }


    return (
        <main className='h-full'>
            <div className='py-5 px-2 md:px-6'>
                <div className='flex justify-between items-center mb-2 font-semibold text-2xl'>
                    <h2>Đơn hàng</h2>
                    {/* <div className='flex gap-2'>
                        <button className='flex items-center gap-1 bg-blue-300 px-4 py-2 rounded-xl font-medium text-sm text-white'>
                            <IoIosAddCircleOutline className='w-5 h-5' />
                            <span>Thêm mới</span>
                        </button>
                        <button className='flex items-center gap-1 bg-red-600 px-4 py-2 rounded-xl font-medium text-sm text-white'>
                            <FaRegTrashAlt className='w-5 h-5' />
                            <span>Xóa</span>
                        </button>
                    </div> */}
                </div>
                <div className='flex-col'>
                    <div className='space-y-4'>
                        <div className='flex lg:flex-row flex-col justify-between gap-2'>
                            <div className='border-gray-300 border rounded-md font-semibold text-gray-600 text-sm table'>
                                <Link href='/' className='border-gray-300 px-3 py-2 border-r w-[1%] whitespace-nowrap align-middle table-cell'>
                                    Đơn hàng mới
                                </Link>
                                <Link href='/' className='border-gray-300 px-3 py-2 border-r w-[1%] whitespace-nowrap align-middle table-cell'>
                                    <span>Đang xử lý</span>
                                </Link>
                                <Link href='/' className='border-gray-300 px-3 py-2 border-r w-[1%] whitespace-nowrap align-middle table-cell'>
                                    <span>Thành công</span>
                                </Link>
                                <Link href={PATH.ORDERS_ALL} className='px-3 py-2 w-[1%] whitespace-nowrap align-middle table-cell'>
                                    <span>Tất cả</span>
                                </Link>
                            </div>
                            <div className='flex items-center gap-4 mb-4 md:mb-0'>
                                <div className='shadow-sm border rounded-md'>
                                    <input placeholder='Tìm kiếm' type='text' className='block focus:border-indigo-300 shadow-sm focus:shadow-blue-300 p-2 rounded-md sm:text-sm sm:leading-5 focus:outline-none' />
                                </div>
                                <div className='relative md:inline-block'>
                                    <button className='flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50' onClick={() => filterRef.current?.classList.toggle('hidden')}>
                                        <FaFilter className='w-4 h-4' />
                                        <span>Filters</span>
                                    </button>
                                    <div ref={filterRef} className='hidden absolute w-52 right-0 mt-2 bg-white shadow-lg rounded-md'>
                                        <div className='py-2'>
                                            <div className='block px-4 py-2 text-sm'>
                                                <label className='text-sm'>Tìm theo người dùng</label>
                                                <div className='mt-1 relative rounded-md shadow-sm'>
                                                    <input className='outline-none rounded-md border p-2 border-gray-300 focus:border-blue-500 w-full' placeholder='Nhập ID người dùng' />
                                                </div>
                                                <div className='h-2 w-1'></div>
                                                <label className='text-sm'>Tìm theo ngày</label>
                                                <div className='mt-1 relative rounded-md shadow-sm'>
                                                    <CustomDatePicker name='date' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='shadow rounded-none md:rounded-lg min-w-full align-middle'>
                            <table className='divide-y divide-gray-200 min-w-full'>
                                <thead>
                                    <tr>
                                        <th className='bg-gray-50 px-3 py-2 md:py-3'>
                                            <button className='flex items-center space-x-1 font-medium text-gray-500 text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none'>
                                                <span>Code</span>
                                            </button>
                                        </th>
                                        <th className='hidden bg-gray-50 px-3 py-2 md:py-3 w-1/3 lg:table-cell'>
                                            <button className='flex items-center space-x-1 font-medium text-gray-500 text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none'>
                                                <span>Thông tin người mua</span>
                                            </button>
                                        </th>
                                        <th className='bg-gray-50 px-3 py-2 md:py-3'>
                                            <button className='flex items-center space-x-1 font-medium text-gray-500 text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none'>
                                                <span>Tổng tiền</span>
                                                <span className='relative flex items-center'>
                                                    <FaChevronDown className='w-2 h-2' />
                                                </span>
                                            </button>
                                        </th>
                                        <th className='bg-gray-50 px-3 py-2 md:py-3'>
                                            <button className='flex items-center space-x-1 font-medium text-gray-500 text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none'>
                                                <span>Ngày đặt</span>
                                                <span className='relative flex items-center'>
                                                    <FaChevronDown className='w-2 h-2' />
                                                </span>
                                            </button>
                                        </th>
                                        <th className='bg-gray-50 px-3 py-2 md:py-3'>
                                            <button className='flex items-center space-x-1 font-medium text-gray-500 text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none'>
                                                <span>Trạng thái</span>
                                            </button>
                                        </th>
                                        <th className='hidden bg-gray-50 px-3 py-2 md:py-3 lg:table-cell'>
                                            <button className='flex items-center space-x-1 font-medium text-gray-500 text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none'>
                                                <span>Thanh toán</span>
                                            </button>
                                        </th>
                                        <th className='bg-gray-50 px-3 py-2 md:py-3 w-12'>
                                            <button className='flex items-center space-x-1 font-medium text-gray-500 text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none'>
                                                <span>HĐ</span>
                                            </button>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className='bg-white divide-y divide-gray-200'>
                                    {isLoading ?
                                        <tr>
                                            <td colSpan={7}>
                                                <div className='w-full p-3'>
                                                    <LoadingShimmer />
                                                </div>
                                            </td>
                                        </tr> :
                                        orders.data && orders.data.map((order: Order) => {
                                            return (
                                                <tr key={order._id} className='bg-white'>
                                                    <td className='px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal'>
                                                        <div className='text-gray-700'>
                                                            <span className='font-medium'>{order.orderCode}</span>
                                                        </div>
                                                    </td>

                                                    <td className='hidden px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal lg:table-cell'>
                                                        <div className='line-clamp-4 text-ellipsis text-gray-700 overflow-hidden'>
                                                            <a href='https://fshoppii.com/cms/cart/view/10/nx2411080010/'>
                                                                <h4>
                                                                    <b className='text-primary'>{order.userId?.name}</b> - <b>Phone: 0932430072</b>
                                                                </h4>
                                                                <p><b>Địa chỉ: </b>{order.address?.street}, {order.address?.wards?.name}, {order.address?.districts?.name}, {order.address?.province?.name}</p>
                                                                <p className='font-semibold text-green-700'>PTTT: Momo</p>
                                                            </a>
                                                        </div>
                                                    </td>

                                                    <td className='px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal'>
                                                        <div className='text-gray-700'>
                                                            <span className='font-medium'>{formatVND(order.totalPrice ?? 0)}</span>
                                                        </div>
                                                    </td>

                                                    <td className='px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal'>
                                                        <div className='text-gray-700'>
                                                            <span className='font-medium'>{moment(order.createdAt).format('HH:mm D/M/YYYY')}</span>
                                                        </div>
                                                    </td>

                                                    <td className='px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal'>
                                                        <div className='text-white text-xs'>
                                                            <div className={`w-fit p-1.5 rounded-md ${orderStatusBg[order.status!]}`}>
                                                                <span>{order.status}</span>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className='hidden px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal lg:table-cell'>
                                                        <div className='text-white text-xs'>
                                                            {
                                                                order.totalPrice! % 2 == 0 ?
                                                                    <span className='bg-[#5eb95b] p-1.5 rounded-md'>Đã thanh toán</span> :
                                                                    <span className='bg-red-500 p-1.5 rounded-md'>Chưa thanh toán</span>
                                                            }
                                                        </div>
                                                    </td>

                                                    <td className='px-3 py-2 md:py-4 whitespace-normal'>
                                                        <div className='flex flex-wrap gap-1 text-white'>
                                                            <Link href={`/cms/orders/${order._id}`} className='p-2 bg-blue-300 border border-transparent rounded-lg hover:bg-blue-700'>
                                                                <FaRegShareSquare className='w-5 h-5' />
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        {
                            /* <div className='p-6 md:p-0'>
                                {{ $products->links() }}
                            </div> */
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}

export default NewOrdersPage