import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { API } from "@/app/common/api"
import { createBanner, deleteBanner, getBanners, updateBanner } from "../services/api.service"
// import { isAxiosError } from "@/app/common/utils"
import { toast } from "react-toastify"

export const readBannersHook = (page: number) => {
    return useQuery({
        queryKey: ["API.READ_BANNERS"],
        queryFn: () => getBanners(),
        placeholderData: (previousData, _) => previousData,
    })
}

export const deleteBannerHook = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => deleteBanner(id),
        onSuccess(data) {
            toast.success("Xóa thương hiệu thành công")
            // toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: ["API.READ_BANNERS"] })
        },
        onError(error) {
            toast.error("Đã có lỗi xảy ra")
            // if (isAxiosError(error)) toast.error(error.response?.data.message)
        },
    })
}

export const createBannerHook = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (banner: Banner) => createBanner(banner),
        onSuccess(data) {
            toast.success("Thêm thương hiệu thành công")
            // toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: ["API.READ_BANNERS"] })
        },
        onError(error) {
            toast.error("Đã có lỗi xảy ra")
            // if (isAxiosError(error)) toast.error(error.response?.data.error)
        },
    })
}

export const updateBannerHook = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, banner }: { id: string, banner: Banner }) => updateBanner(id, banner),
        onSuccess(data) {
            toast.success("Sửa thương hiệu thành công")
            // toast.success(data.message)
            queryClient.invalidateQueries({ queryKey: ["API.READ_BANNERS"] })
        },
        onError(error) {
            toast.error("Đã có lỗi xảy ra")
            // if (isAxiosError(error)) toast.error(error.response?.data.error)
        },
    })
}