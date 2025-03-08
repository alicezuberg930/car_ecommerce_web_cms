'use client'
import { icons } from '@/app/common/icons'
import { PATH } from '@/app/common/path'
import BrandModal from '@/app/components/BrandModal'
import CustomPaginator from '@/app/components/CustomPaginator'
import LoadingShimmer from '@/app/components/LoadingShimmer'
import { deleteBrandHook, getBrandsHook } from '@/app/hooks/brand.hook'
import Link from 'next/link'
import { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const BrandsPage: React.FC = () => {
    const [page, setPage] = useState<number>(1)
    const [search, setSearch] = useState<string>("")
    const { IoIosAddCircleOutline, MdModeEdit, FaRegTrashAlt } = icons
    const { data: brands, isLoading } = getBrandsHook({ page, search })
    const remove = deleteBrandHook()
    const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null)

    const deleteBrandAction = (id: string) => {
        withReactContent(Swal).fire({
            title: 'Bạn có chắc chắn không?',
            text: 'Bạn sẽ không thể đảo ngược hành động',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        }).then(result => {
            if (result.isConfirmed) remove.mutate({ id })
        })
    }

    return (
        <main className='h-full'>
            <div className='py-5 px-2 md:px-6'>
                <div className='flex justify-between items-center mb-2 font-semibold text-2xl'>
                    <h2>Thương hiệu</h2>
                    <Link href={PATH.NEW_BRAND} className='flex items-center gap-1 bg-blue-300 px-4 py-2 rounded-xl font-medium text-sm text-white'>
                        <IoIosAddCircleOutline className='w-5 h-5' />
                        <span>Thêm mới</span>
                    </Link>
                </div>
                <div className='flex-col'>
                    <div className='space-y-4'>
                        <div className='flex lg:flex-row flex-col justify-between gap-2'>
                            <div className='flex items-center gap-4 mb-4 md:mb-0'>
                                <div className='shadow-sm border rounded-md'>
                                    <input onChange={(e) => setSearch(e.target.value)} placeholder='Tìm kiếm' type='text' className='block focus:border-indigo-300 shadow-sm focus:shadow-blue-300 p-2 rounded-md sm:text-sm sm:leading-5 focus:outline-none' />
                                </div>
                                <div className='shadow-sm border rounded-md'>
                                    <select className='block border-gray-300 focus:border-indigo-300 focus:shadow-blue-300 py-2 pr-10 pl-3 border w-full text-base leading-6 focus:outline-none sm:text-sm'>
                                        <option value='5'>5</option>
                                        <option value='10'>10</option>
                                        <option value='15'>15</option>
                                        <option value='20'>20</option>
                                        <option value='50'>50</option>
                                        <option value='100'>100</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='shadow rounded-none md:rounded-lg min-w-full align-middle'>
                            <table className='divide-y divide-gray-200 min-w-full'>
                                <thead>
                                    <tr>
                                        <th className='bg-gray-50 px-3 py-2 md:py-3'>
                                            <button className='flex items-center space-x-1 font-medium text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none'>
                                                <span>Tên</span>
                                            </button>
                                        </th>
                                        <th className='bg-gray-50 px-3 py-2 md:py-3'>
                                            <button className='flex items-center space-x-1 font-medium text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none'>
                                                <span>Quốc gia</span>
                                            </button>
                                        </th>
                                        <th className='bg-gray-50 px-3 py-2 md:py-3'>
                                            <button className='flex items-center space-x-1 font-medium text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none'>
                                                <span>Logo</span>
                                            </button>
                                        </th>
                                        <th className='bg-gray-50 px-3 py-2 md:py-3'>
                                            <button className='flex items-center space-x-1 font-medium text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none'>
                                                <span>Hành động</span>
                                            </button>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className='bg-white divide-y divide-gray-200'>
                                    {
                                        isLoading ?
                                            <tr>
                                                <td colSpan={7}>
                                                    <div className='w-full p-3'>
                                                        <LoadingShimmer />
                                                    </div>
                                                </td>
                                            </tr> :
                                            brands.brands && (brands.brands as Brand[]).map((v, i) => {
                                                return (
                                                    <tr key={i} className='bg-white'>
                                                        <td className='px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal'>
                                                            <div className='text-gray-700'>
                                                                <span className='font-medium'>{v.name}</span>
                                                            </div>
                                                        </td>

                                                        <td className='px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal'>
                                                            <div className='text-gray-700'>
                                                                <span className='font-medium'>{v.country}</span>
                                                            </div>
                                                        </td>

                                                        <td className='px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal'>
                                                            <div className='h-24 w-24'>
                                                                <img className='object-cover w-full h-full' src={v.logo ?? '/logo.png'} />
                                                            </div>
                                                        </td>

                                                        <td className='px-3 py-2 md:py-4 whitespace-normal'>
                                                            <div className='flex flex-wrap gap-1 text-white'>
                                                                <button className='p-2 bg-gray-600 border border-transparent rounded-lg hover:bg-gray-700'
                                                                    onClick={() => setSelectedBrand(v)} title='Edit'
                                                                >
                                                                    <MdModeEdit size={20} />
                                                                </button>
                                                                <button className='p-2 bg-red-600 border border-transparent rounded-lg hover:bg-red-700'
                                                                    onClick={() => deleteBrandAction(v._id!)} title='Delete'
                                                                >
                                                                    <FaRegTrashAlt size={20} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                    }
                                </tbody>
                            </table>
                        </div>
                        {isLoading ? <></> : brands &&
                            <CustomPaginator setCurrentPage={setPage} currentPage={page} totalPage={brands.totalPages} />
                        }
                    </div>
                </div>
            </div>
            <div className={`w-full h-screen fixed inset-0 z-20 overflow-y-scroll ${selectedBrand != null ? 'block' : 'hidden'}`}>
                <div className='flex items-end justify-center min-h-screen px-4 py-6 text-center sm:block sm:p-0'>
                    <div className='fixed inset-0 transition-opacity'>
                        <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
                    </div>
                    <div className='z-30 relative inline-block bg-white shadow-xl my-8 sm:align-middle max-w-5xl rounded-md w-full'>
                        <div className='px-4 py-5 bg-white text-left rounded-md'>
                            {selectedBrand ? <BrandModal selectedBrand={selectedBrand} setSelected={setSelectedBrand} /> : <></>}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default BrandsPage