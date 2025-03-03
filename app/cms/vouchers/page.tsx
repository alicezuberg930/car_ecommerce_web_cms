"use client"
import { icons } from "@/app/common/icons";
import { PATH } from "@/app/common/path";
import LoadingShimmer from "@/app/components/LoadingShimmer";
import { approveVoucherHook, readVouchersHook } from "@/app/hooks/voucher.hook";
import Link from "next/link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const VouchersPage: React.FC = () => {
    const { IoIosAddCircleOutline, FaCheck } = icons
    const { data: vouchers, isLoading } = readVouchersHook(1)
    const approve = approveVoucherHook()

    const approveVoucher = (id: string) => {
        withReactContent(Swal).fire({
            title: 'Bạn có chắc chắn không?',
            text: 'Bạn sẽ không thể đảo ngược hành động',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Chấp thuận',
            cancelButtonText: 'Hủy'
        }).then(result => {
            if (result.isConfirmed) approve.mutate(id)
        })
    }

    return (
        <main className="h-full">
            <div className="py-5 px-2 md:px-6">
                <div className="flex justify-between items-center mb-2 font-semibold text-2xl">
                    <h2>Mã khuyến mãi</h2>
                    <Link href={PATH.NEW_VOUCHERS} className="flex items-center gap-1 bg-blue-300 px-4 py-2 rounded-xl font-medium text-sm text-white">
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
                                                <span>Mã KM</span>
                                            </button>
                                        </th>
                                        <th className="bg-gray-50 px-3 py-2 md:py-3">
                                            <button className="flex items-center space-x-1 font-medium text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                <span>Loại KM</span>
                                            </button>
                                        </th>
                                        <th className="bg-gray-50 px-3 py-2 md:py-3">
                                            <button className="flex items-center space-x-1 font-medium text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                <span>Giá trị</span>
                                            </button>
                                        </th>
                                        <th className="bg-gray-50 px-3 py-2 md:py-3">
                                            <button className="flex items-center space-x-1 font-medium text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                <span>Từ</span>
                                            </button>
                                        </th>
                                        <th className="bg-gray-50 px-3 py-2 md:py-3">
                                            <button className="flex items-center space-x-1 font-medium text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                <span>Ngày bắt đầu</span>
                                            </button>
                                        </th>
                                        <th className="bg-gray-50 px-3 py-2 md:py-3">
                                            <button className="flex items-center space-x-1 font-medium text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                <span>Ngày kết thúc</span>
                                            </button>
                                        </th>
                                        <th className="bg-gray-50 px-3 py-2 md:py-3">
                                            <button className="flex items-center space-x-1 font-medium text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                <span>Lượt dùng</span>
                                            </button>
                                        </th>
                                        <th className="bg-gray-50 px-3 py-2 md:py-3">
                                            <button className="flex items-center space-x-1 font-medium text-left text-xs focus:underline uppercase leading-4 tracking-wider group focus:outline-none">
                                                <span>Trạng thái</span>
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
                                            vouchers && (vouchers.data as any[]).map((v) => {
                                                return (
                                                    <tr key={v._id} className="bg-white">
                                                        <td className="px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal">
                                                            <div className="text-gray-700">
                                                                <span className="font-medium">{v.voucherCode}</span>
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal">
                                                            <div className="text-gray-700">
                                                                <span className="font-medium">{v.discountType}</span>
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal">
                                                            <div className="text-gray-700">
                                                                <span className="font-medium">{v.discountValue}</span>
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal">
                                                            <div className="text-gray-700">
                                                                <span className="font-medium">{v.minOrderValue}</span>
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal">
                                                            <div className="text-gray-700">
                                                                <span className="font-medium">{v.endDate?.split('T')[0]}</span>
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal">
                                                            <div className="text-gray-700">
                                                                <span className="font-medium">{v.endDate?.split('T')[0]}</span>
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal">
                                                            <div className="text-gray-700">
                                                                <span className="font-medium">{v.usageLimit}</span>
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 text-gray-900 text-sm leading-5 whitespace-normal">
                                                            <div className="text-gray-700">
                                                                <span className="font-medium">{v.status}</span>
                                                            </div>
                                                        </td>

                                                        <td className="px-3 py-2 md:py-4 whitespace-normal text-sm leading-5 text-gray-900">
                                                            <div className="flex flex-wrap justify-start gap-1">
                                                                <button onClick={() => approveVoucher(v._id!)} className="flex items-center p-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700">
                                                                    <FaCheck size={20} />
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

export default VouchersPage