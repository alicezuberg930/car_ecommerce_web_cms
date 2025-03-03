import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { API } from "@/app/common/api"
import { getOrders, updateOrder } from "../services/api.service"
import { toast } from "react-toastify"

export const readOrdersHook = () => {
    return useQuery({
        queryKey: [API.READ_ORDERS],
        queryFn: () => getOrders(),
        placeholderData: (previousData, previousQuery) => previousData,
    })
}

export const updateOrderHook = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, body }: { id: string, body: any }) => updateOrder(id, body),
        onSuccess(_) {
            toast.success("Cập nhật đơn hàng thành công")
            queryClient.invalidateQueries({ queryKey: [API.READ_ORDERS] })
        },
        onError(error: any) {
            toast.error(error.response?.data.message ?? "Đã có lỗi xảy ra")
        }
    })
}
