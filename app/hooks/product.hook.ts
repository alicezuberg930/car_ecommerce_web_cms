import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { PATH } from "../common/path"
import { API } from "../common/api"
import { createProduct, deleteProduct, getProducts, updateProduct } from "../services/api.service"

export const getProductsHook = ({ filter }: { filter: ProductFilter }) => {
    return useQuery({
        queryKey: [API.PRODUCTS, filter],
        queryFn: () => getProducts({ filter }),
        placeholderData: (previousData, _) => previousData,
    })
}

export const deleteProductHook = (page: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id }: { id: string }) => deleteProduct({ id }),
        onSuccess(data) {
            toast.success("Xóa sản phẩm thành công")
            queryClient.invalidateQueries({ queryKey: [API.PRODUCTS, page] })
        },
        onError(error) {
            toast.error("Đã có lỗi xảy ra")
        }
    })
}
export const createProductHook = (page: number) => {
    const queryClient = useQueryClient()
    const router = useRouter()
    return useMutation({
        mutationFn: ({ product }: { product: Product }) => createProduct({ product }),
        onSuccess(_) {
            toast.success('Thêm sản phẩm thành công')
            queryClient.invalidateQueries({ queryKey: [API.PRODUCTS, page] })
            router.push(PATH.PRODUCTS)
        },
        onError(error) {
            toast.error("Đã có lỗi xảy ra")
        },
    })
}

export const updateProductHook = (page: number) => {
    const queryClient = useQueryClient()
    const router = useRouter()
    return useMutation({
        mutationFn: ({ product, id }: { product: Product, id: string }) => updateProduct({ product, id }),
        onSuccess(_) {
            toast.success('Sửa sản phẩm thành công')
            queryClient.invalidateQueries({ queryKey: [API.PRODUCTS, page] })
            router.push(PATH.PRODUCTS)
        },
        onError(error) {
            toast.error("Đã có lỗi xảy ra")
        },
    })
}

