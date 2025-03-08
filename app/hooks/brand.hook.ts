import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { API } from "../common/api"
import { createBrand, deleteBrand, getBrands, updateBrand } from "../services/api.service"
import { useRouter } from "next/navigation"
import { PATH } from "../common/path"

export const getBrandsHook = ({ page, search }: { page: number, search: string }) => {
    return useQuery({
        queryKey: [API.BRANDS, { page, search }],
        queryFn: () => getBrands({ page, search }),
        placeholderData: (previousData, _) => previousData,
    })
}

export const deleteBrandHook = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id }: { id: string }) => deleteBrand({ id }),
        onSuccess(data) {
            toast.success("Xóa thương hiệu thành công")
            // toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: [API.BRANDS] })
        },
        onError(error) {
            toast.error("Đã có lỗi xảy ra")
            // if (isAxiosError(error)) toast.error(error.response?.data.message)
        },
    })
}

export const createBrandHook = () => {
    const queryClient = useQueryClient()
    const router = useRouter()
    return useMutation({
        mutationFn: ({ brand }: { brand: Brand }) => createBrand({ brand }),
        onSuccess(data) {
            toast.success("Thêm thương hiệu thành công")
            router.push(PATH.BRANDS)
            queryClient.invalidateQueries({ queryKey: [API.BRANDS] })
        },
        onError(error) {
            toast.error("Đã có lỗi xảy ra")
        },
    })
}

export const updateBrandHook = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, brand }: { id: string, brand: Brand }) => updateBrand({ brand, id }),
        onSuccess(data) {
            toast.success("Sửa thương hiệu thành công")
            // toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: [API.BRANDS] })
        },
        onError(error) {
            toast.error("Đã có lỗi xảy ra")
            // if (isAxiosError(error)) toast.error(error.response?.data.error)
        },
    })
}