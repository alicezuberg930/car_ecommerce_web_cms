import OrderDetails from "../components/OrderDetailsPage"

const OrderDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id
    return <OrderDetails id={id} />
}

export default OrderDetailsPage