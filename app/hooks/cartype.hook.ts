import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { API } from "../common/api"
import { createCarType, deleteCarType, getCarTypes } from "../services/api.service"
import { useRouter } from "next/navigation"
import { PATH } from "../common/path"

export const getCarTypesHook = ({ page, search }: { page: number, search: string }) => {
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

// export const updateBrandHook = () => {
//     const queryClient = useQueryClient()
//     return useMutation({
//         mutationFn: ({ id, brand }: { id: string, brand: Brand }) => updateBrand(id, brand),
//         onSuccess(data) {
//             toast.success("Sửa thương hiệu thành công")
//             // toast.success(data.message)
//             queryClient.invalidateQueries({ queryKey: [API.READ_BRANDS] })
//         },
//         onError(error) {
//             toast.error("Đã có lỗi xảy ra")
//             // if (isAxiosError(error)) toast.error(error.response?.data.error)
//         },
//     })
// }