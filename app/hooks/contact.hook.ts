import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { API } from "@/app/common/api"
import { toast } from "react-toastify"
import { createContact, getSiteConfigs } from "../services/api.service"

export const getContactHook = () => {
    return useQuery({
        queryKey: ["dd"],
        queryFn: () => getSiteConfigs(),
    })
}

export const createContactHook = () => {
    // const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ contact }: { contact: Contact }) => createContact({ contact }),
        onSuccess(data) {
            toast.success("Thêm thông tin liên lạc thành công")
            // queryClient.invalidateQueries({ queryKey: ["API."] })
        },
        onError(error) {
            toast.error("Đã có lỗi xảy ra")
        },
    })
}

