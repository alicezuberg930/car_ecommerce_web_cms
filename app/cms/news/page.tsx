"use client"
import { icons } from "@/app/common/icons";
import { PATH } from "@/app/common/path";
import LoadingShimmer from "@/app/components/LoadingShimmer";
import { getNewsHook } from "@/app/hooks/new.hook";
import Link from "next/link";

const NewsPage: React.FC = () => {
    const { IoIosAddCircleOutline, MdModeEdit } = icons
    const { data: news, isLoading } = getNewsHook(1)

    return (
        <main className="h-full">
            <div className="py-5 px-2 md:px-6">
                <div className="flex justify-between items-center mb-2 font-semibold text-2xl">
                    <h2>Tin tức</h2>
                    <Link href={PATH.NEW_NEWS} className="flex items-center gap-1 bg-blue-300 px-4 py-2 rounded-xl font-medium text-sm text-white">
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
                                                <span>Tên</span>
                                            </button>
                                        </th>
                                        <th className="bg-gray-50 px-3 py-2 md:py-3">
                                            <button className="flex items-center space-x-1 font-medium text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                <span>Hình ảnh</span>
                                            </button>
                                        </th>
                                        <th className="bg-gray-50 px-3 py-2 md:py-3 w-1/3">
                                            <button className="flex items-center space-x-1 font-medium text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                <span>Nội dung</span>
                                            </button>
                                        </th>
                                        <th className="bg-gray-50 px-3 py-2 md:py-3">
                                            <button className="flex items-center space-x-1 font-medium text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                <span>Category</span>
                                            </button>
                                        </th>
                                        <th className="bg-gray-50 px-3 py-2 md:py-3">
                                            <button className="flex items-center space-x-1 font-medium text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                <span>Tags</span>
                                            </button>
                                        </th>
                                        <th className="bg-gray-50 px-3 py-2 md:py-3">
                                            <button className="flex items-center space-x-1 font-medium text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                <span>Status</span>
                                            </button>
                                        </th>
                                        <th className="bg-gray-50 px-3 py-2 md:py-3">
                                            <button className="flex items-center space-x-1 font-medium text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                <span>Approve</span>
                                            </button>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-200">
                                    {
                                        isLoading ?
                                            <tr>
                                                <td colSpan={9}>
                                                    <div className="w-full p-3">
                                                        <LoadingShimmer />
                                                    </div>
                                                </td>
                                            </tr> :
                                            news.data && (news.data as New[]).map((v) => {
                                                return (
                                                    <tr key={v._id} className="bg-white">
                                                        <td className="px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal">
                                                            <div className="text-gray-700">
                                                                <span className="font-medium">{v.title}</span>
                                                            </div>
                                                        </td>

                                                        <td className='px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal'>
                                                            <div className='h-24 w-24'>
                                                                <img className='object-cover w-full h-full' src={v.images![0] ?? '/logo.png'} />
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal">
                                                            <div className='font-semibold text-ellipsis overflow-hidden line-clamp-2'>
                                                                {v.content}
                                                            </div>
                                                            <div className="text-gray-700">
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal">
                                                            <div className="text-gray-700">
                                                                <span className="font-medium">{v.category}</span>
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal">
                                                            <div className="text-gray-700">
                                                                {
                                                                    v.tags && v.tags.map(tag => {
                                                                        return (
                                                                            <span key={tag} className="font-medium p-2 rounded-md bg-orange-400 text-white">{tag}</span>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal">
                                                            <div className="text-gray-700">
                                                                <span className="font-medium">{v.published ? 'Public' : 'Private'}</span>
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                                            <div className="flex flex-wrap justify-start gap-1">
                                                                <button className="flex items-center p-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700">
                                                                    <MdModeEdit size={20} />
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
                        {
                            /* <div className="p-6 md:p-0">
                                {{ $products->links() }}
                            </div> */
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}

export default NewsPage