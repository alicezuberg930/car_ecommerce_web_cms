"use client"
import { icons } from "@/app/common/icons"
import { PATH } from "@/app/common/path"
import CustomPaginator from "@/app/components/CustomPaginator"
import ImageModal from "@/app/components/ImageModal"
import LoadingShimmer from "@/app/components/LoadingShimmer"
import { deleteImageHook, getImagesHook } from "@/app/hooks/image.hook"
import Link from "next/link"
import { useState } from "react"
import { FaRegTrashAlt } from "react-icons/fa"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const ImagesPage: React.FC = () => {
    const [page, setPage] = useState<number>(1)
    const { IoIosAddCircleOutline, MdModeEdit } = icons
    const { data: images, isLoading } = getImagesHook(1)
    const [selectedImage, setSelectedImage] = useState<Image | null>(null)
    const deleted = deleteImageHook(1)

    const deleteImageAction = (id: string) => {
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
            if (result.isConfirmed) deleted.mutate({ id })
        })
    }

    return (
        <main className="h-full">
            <div className="py-5 px-2 md:px-6">
                <div className="flex justify-between items-center mb-2 font-semibold text-2xl">
                    <h2>Tin tức</h2>
                    <Link href={PATH.NEW_IMAGE} className="flex items-center gap-1 bg-orange-300 px-4 py-2 rounded-xl font-medium text-sm text-white">
                        <IoIosAddCircleOutline className="w-5 h-5" />
                        <span>Thêm mới</span>
                    </Link>
                </div>
                <div className="flex-col">
                    <div className="space-y-4">
                        <div className="shadow rounded-none md:rounded-lg min-w-full align-middle">
                            <table className="divide-y divide-gray-200 min-w-full">
                                <thead>
                                    <tr>
                                        <th className="bg-gray-50 px-3 py-2 md:py-3">
                                            <button className="flex items-center space-x-1 font-medium text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                <span>Trạng thái</span>
                                            </button>
                                        </th>
                                        <th className="bg-gray-50 px-3 py-2 md:py-3">
                                            <button className="flex items-center space-x-1 font-medium text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                <span>Hình ảnh</span>
                                            </button>
                                        </th>
                                        <th className="bg-gray-50 px-3 py-2 md:py-3">
                                            <button className="flex items-center space-x-1 font-medium text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                <span>HĐ</span>
                                            </button>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-200">
                                    {
                                        isLoading ?
                                            <tr>
                                                <td colSpan={3}>
                                                    <div className="w-full p-3">
                                                        <LoadingShimmer />
                                                    </div>
                                                </td>
                                            </tr> :
                                            images.data && (images.data as Image[]).map((v) => {
                                                return (
                                                    <tr key={v._id} className="bg-white">
                                                        <td className="px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal">
                                                            <div className="text-gray-700">
                                                                <span className="font-medium">{v.status}</span>
                                                            </div>
                                                        </td>

                                                        <td className='px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal'>
                                                            <div className='h-24 w-24'>
                                                                <img className='object-cover w-full h-full' src={v.url![0] ?? '/logo.png'} />
                                                            </div>
                                                        </td>

                                                        <td className='px-3 py-2 md:py-4'>
                                                            <div className='flex flex-wrap gap-1 text-white'>
                                                                <button className='p-2 bg-orange-600 border border-transparent rounded-lg hover:bg-orange-700'
                                                                    onClick={() => setSelectedImage(v)} title='Edit'
                                                                >
                                                                    <MdModeEdit size={20} />
                                                                </button>
                                                                <button className='p-2 bg-red-600 border border-transparent rounded-lg hover:bg-red-700'
                                                                    onClick={() => deleteImageAction(v._id!)} title='Delete'
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
                        {isLoading ? <></> : images && images.pagination &&
                            <CustomPaginator setCurrentPage={setPage} currentPage={page} totalPage={images.pagination.totalPages} />
                        }
                    </div>
                </div>
            </div>
            <div className={`w-full h-screen fixed inset-0 z-20 overflow-y-scroll ${selectedImage != null ? 'block' : 'hidden'}`}>
                <div className='flex items-end justify-center min-h-screen px-4 py-6 text-center sm:block sm:p-0'>
                    <div className='fixed inset-0 transition-opacity'>
                        <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
                    </div>
                    <div className='z-30 relative inline-block bg-white shadow-xl my-8 sm:align-middle max-w-5xl rounded-md w-full'>
                        <div className='px-4 py-5 bg-white text-left rounded-md'>
                            {selectedImage ? <ImageModal selectedImage={selectedImage} setSelected={setSelectedImage} /> : <></>}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ImagesPage