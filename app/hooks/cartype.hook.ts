import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { API } from "../common/api"
import { createCarType, deleteCarType, getCarTypes, updateCarType } from "../services/api.service"
import { useRouter } from "next/navigation"
import { PATH } from "../common/path"

export const getCarTypesHook = ({ page, search }: { page?: number, search?: string }) => {
    return useQuery({
        queryKey: [API.CARTYPES, { page, search }],
        queryFn: () => getCarTypes({ page, search }),
        placeholderData: (previousData, _) => previousData,
    })
}

export const deleteCarTypeHook = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id }: { id: string }) => deleteCarType({ id }),
        onSuccess(data) {
            toast.success("Xóa loại xe thành công")
            queryClient.invalidateQueries({ queryKey: [API.CARTYPES] })
        },
        onError(error) {
            toast.error("Đã có lỗi xảy ra")
        },
    })
}

export const createCarTypeHook = () => {
    const queryClient = useQueryClient()
    const router = useRouter()
    return useMutation({
        mutationFn: ({ cartype }: { cartype: CarType }) => createCarType({ cartype }),
        onSuccess(data) {
            toast.success("Thêm loại xe thành công")
            queryClient.invalidateQueries({ queryKey: [API.CARTYPES] })
            router.push(PATH.CARTYPES)
        },
        onError(error) {
            toast.error("Đã có lỗi xảy ra")
        },
    })
}

export const updateCarTypeHook = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, cartype }: { id: string, cartype: CarType }) => updateCarType({ id, cartype }),
        onSuccess(data) {
            toast.success("Sửa loại xe thành công")
            queryClient.invalidateQueries({ queryKey: [API.CARTYPES] })
        },
        onError(error) {
            toast.error("Đã có lỗi xảy ra")
        },
    })
}