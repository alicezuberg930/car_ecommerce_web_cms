import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { API } from "../common/api"
import { createImage, deleteImage, getImages, updateImage } from "../services/api.service"
import { useRouter } from "next/navigation"
import { PATH } from "../common/path"

export const getImagesHook = (page: number) => {
    return useQuery({
        queryKey: [API.IMAGES, page],
        queryFn: () => getImages(),
        placeholderData: (previousData, _) => previousData,
    })
}

export const deleteImageHook = (page: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id }: { id: string }) => deleteImage({ id }),
        onSuccess(data) {
            toast.success("Xóa ảnh thành công")
            queryClient.invalidateQueries({ queryKey: [API.IMAGES, page] })
        },
        onError(error) {
            toast.error("Đã có lỗi xảy ra")
        },
    })
}

export const createImageHook = () => {
    const queryClient = useQueryClient()
    const router = useRouter()
    return useMutation({
        mutationFn: ({ image }: { image: Image }) => createImage({ image }),
        onSuccess(data) {
            toast.success("Thêm ảnh thành công")
            router.push(PATH.IMAGES)
            queryClient.invalidateQueries({ queryKey: [API.IMAGES] })
        },
        onError(error) {
            toast.error("Đã có lỗi xảy ra")
        },
    })
}

export const updateImageHook = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, image }: { id: string, image: Image }) => updateImage({ image, id }),
        onSuccess(data) {
            toast.success("Sửa hình ảnh thành công")
            queryClient.invalidateQueries({ queryKey: [API.IMAGES, 1] })
        },
        onError(error) {
            toast.error("Đã có lỗi xảy ra")
        },
    })
}