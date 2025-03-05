import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { API } from "@/app/common/api"
import { createBanner, deleteBanner, getBanners, updateBanner } from "../services/api.service"
import { toast } from "react-toastify"

export const getBannersHook = () => {
    return useQuery({
        queryKey: [API.BANNERS],
        queryFn: () => getBanners(),
        placeholderData: (previousData, _) => previousData,
    })
}

export const deleteBannerHook = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id }: { id: string }) => deleteBanner({ id }),
        onSuccess(data) {
            toast.success("Xóa banner thành công")
            queryClient.invalidateQueries({ queryKey: [API.BANNERS] })
        },
        onError(error) {
            toast.error("Đã có lỗi xảy ra")
        },
    })
}

export const createBannerHook = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ banner }: { banner: Banner }) => createBanner({ banner }),
        onSuccess(data) {
            toast.success("Thêm banner thành công")
            queryClient.invalidateQueries({ queryKey: [API.BANNERS] })
        },
        onError(error) {
            toast.error("Đã có lỗi xảy ra")
        },
    })
}

export const updateBannerHook = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, banner }: { id: string, banner: Banner }) => updateBanner({ id, banner }),
        onSuccess(data) {
            toast.success("Sửa banner thành công")
            queryClient.invalidateQueries({ queryKey: ["API.READ_BANNERS"] })
        },
        onError(error) {
            toast.error("Đã có lỗi xảy ra")
        },
    })
}