import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { API } from "@/app/common/api"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { PATH } from "../common/path"
import { createNews, getNews, updateNews } from "../services/api.service"

export const getNewsHook = (page: number) => {
    return useQuery({
        queryKey: [API.NEWS, page],
        queryFn: () => getNews(),
        placeholderData: (previousData, _) => previousData,
    })
}

export const createNewsHook = () => {
    const queryClient = useQueryClient()
    const router = useRouter()
    return useMutation({
        mutationFn: ({ n }: { n: New }) => createNews({ n }),
        onSuccess(_) {
            toast.success("Thêm tin tức thành công")
            queryClient.invalidateQueries({ queryKey: [API.NEWS, 1] })
            router.push(PATH.NEWS)
        },
        onError(_) {
            toast.error("Đã có lỗi xảy ra")
        },
    })
}

export const updateNewsHook = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, n }: { id: string, n: New }) => updateNews({ id, n }),
        onSuccess(_) {
            toast.success("Cập nhật tin tức thành công")
            queryClient.invalidateQueries({ queryKey: [API.NEWS] })
        },
        onError(_) {
            toast.error("Đã có lỗi xảy ra")
        },
    })
}