import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "@/app/services/api.service";
import { toast } from "react-toastify";

export const uploadFileHook = () => {
    return useMutation({
        mutationFn: ({ file }: { file: FormData }) => uploadFile({ file }),
        onError(error) {
            toast.error("Tải ảnh lên thất bại")
        },
    })
}