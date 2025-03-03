import ProductModal from "@/app/components/ProductModal"
import { getProductDetails } from "@/app/services/api.service"

const EditProductPage: React.FC<{ params: Promise<{ id: string }> }> = async ({ params }) => {
    const id = (await params).id
    const response = await getProductDetails({ id })
    const product: Product = response.data

    return <ProductModal page={1} selectedProduct={product} />
}

export default EditProductPage