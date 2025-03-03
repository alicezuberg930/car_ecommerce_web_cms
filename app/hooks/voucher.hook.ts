import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { API } from "@/app/common/api"
import { approveVoucher, createVoucher, getVouchers } from "../services/api.service"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { PATH } from "../common/path"

export const readVouchersHook = (page: number) => {
    return useQuery({
        queryKey: [API.READ_VOUCHERS],
        queryFn: () => getVouchers(),
        placeholderData: (previousData, _) => previousData,
    })
}

export const createVoucherHook = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: (voucher: Voucher) => createVoucher(voucher),
        onSuccess(_) {
            toast.success("Thêm mã khuyến mãi thành công")
            queryClient.invalidateQueries({ queryKey: [API.READ_VOUCHERS] })
            router.push(PATH.VOUCHERS)
        },
        onError(_) {
            toast.error("Đã có lỗi xảy ra")
        },
    })
}

export const approveVoucherHook = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => approveVoucher(id),
        onSuccess(_) {
            toast.success("Chấp thuận mã khuyến mãi thành công")
            queryClient.invalidateQueries({ queryKey: [API.READ_VOUCHERS] })
        },
        onError(_) {
            toast.error("Đã có lỗi xảy ra")
        },
    })
}