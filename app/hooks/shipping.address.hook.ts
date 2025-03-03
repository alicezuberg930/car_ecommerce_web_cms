import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { API } from "../common/api"
import { createShippings, getProvinces, getShippingTags, getShippings, updateShippings } from "../services/api.service"
import { toast } from "react-toastify"

export const readShippingAddressHook = () => {
    return useQuery({
        queryKey: [API.SHIPPING],
        queryFn: () => getShippings(),
        placeholderData: (previousData, _) => previousData,
    })
}

export const readShippingListTagHook = () => {
    return useQuery({
        queryKey: [API.SHIPPING_TAGS],
        queryFn: () => getShippingTags(),
        placeholderData: (previousData, _) => previousData,
    })
}

export const handleShippingAddressHook = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ body, isUpdate }: { body: any, isUpdate: boolean }) => isUpdate ? updateShippings(body) : createShippings(body),
        onSuccess(_) {
            toast.success("Chỉnh sửa địa chỉ giao hàng thành công")
            queryClient.invalidateQueries({ queryKey: [API.SHIPPING] })
        },
        onError(_) {
            toast.error("Đã có lỗi xảy ra")
        },
    })
}

export const readProvincesHook = () => {
    return useQuery({
        queryKey: [API.PROVINCES],
        queryFn: () => getProvinces(),
        placeholderData: (previousData, _) => previousData,
    })
}