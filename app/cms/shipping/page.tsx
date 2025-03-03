'use client'
import { icons } from "@/app/common/icons"
import { PATH } from "@/app/common/path"
import LoadingShimmer from "@/app/components/LoadingShimmer"
import ShippingModal from "@/app/components/ShippingModal"
import { readShippingAddressHook, readShippingListTagHook } from "@/app/hooks/shipping.address.hook"
import Link from "next/link"
import { useState } from "react"

const AddressCard: React.FC<{ title: string, address: Address, name: string, email: string, phone: string }> = ({ title, address, name, email, phone }) => {
    return (
        <div className="p-4 shadow-lg rounded-2xl bg-white">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p><strong>Tỉnh/Thành phố:</strong> {address.provinces?.name}</p>
            <p><strong>Quận/Huyện:</strong> {address.districts?.name}</p>
            <p><strong>Phường/Xã:</strong> {address.wards?.name}</p>
            <p><strong>Đường:</strong> {address?.street}</p>
            <p><strong>Tên:</strong> {name}</p>
            <p><strong>Điện thoại:</strong> {phone}</p>
            <p><strong>Email:</strong> {email}</p>
        </div>
    )
}

const ShippingList = () => {
    const { data: shippingAddress, isLoading } = readShippingAddressHook()
    const { IoIosAddCircleOutline, MdModeEdit } = icons
    const [selectedShipping, setSelectedShipping] = useState<ShippingAddress | null>(null)

    return (
        <main className="h-full">
            <div className="py-5 px-2 md:px-6">
                <div className="flex justify-between items-center mb-2 font-semibold text-2xl">
                    <h2>Địa chỉ giao hàng</h2>
                    <div className="flex gap-2">
                        {shippingAddress && shippingAddress.data && shippingAddress.data.length > 0 ?
                            <button className="flex items-center gap-1 bg-green-300 px-4 py-2 rounded-xl font-medium text-sm text-white"
                                onClick={() => setSelectedShipping(shippingAddress.data[0])}
                            >
                                <MdModeEdit className="w-5 h-5" />
                                <span>Chỉnh sửa</span>
                            </button> :
                            <Link href={PATH.NEW_SHIPPING_ADDRESS} className="flex items-center gap-1 bg-blue-300 px-4 py-2 rounded-xl font-medium text-sm text-white">
                                <IoIosAddCircleOutline className="w-5 h-5" />
                                <span>Thêm mới</span>
                            </Link>
                        }
                    </div>
                </div>
                <div className="flex-col">
                    <div className="space-y-4">
                        {isLoading ? <LoadingShimmer /> : shippingAddress.data && shippingAddress.data.length > 0 ?
                            <div className="flex flex-col gap-4 py-6 bg-gray-100">
                                <AddressCard title="Địa chỉ nhận hàng" address={shippingAddress.data[0].PickupAddress}
                                    name={shippingAddress.data[0].pick_name}
                                    phone={shippingAddress.data[0].pick_phone}
                                    email={shippingAddress.data[0].pick_email}
                                />
                                <AddressCard title="Địa chỉ trả hàng" address={shippingAddress.data[0].ReturnAddress}
                                    name={shippingAddress.data[0].return_name}
                                    phone={shippingAddress.data[0].return_phone}
                                    email={shippingAddress.data[0].return_email}
                                />
                            </div> :
                            <span className="text-center">Không có địa chỉ giao hàng</span>
                        }
                    </div>
                </div>
            </div>
            <div className={`w-full h-screen fixed inset-0 z-20 overflow-y-scroll ${selectedShipping != null ? 'block' : 'hidden'}`}>
                <div className="flex items-end justify-center min-h-screen px-4 py-6 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <div className="z-30 relative inline-block bg-white shadow-xl my-8 sm:align-middle max-w-5xl rounded-md w-full">
                        <div className="px-4 py-5 bg-white text-left rounded-md">
                            {selectedShipping ? <ShippingModal selectedShipping={selectedShipping} setSelected={setSelectedShipping} /> : <></>}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ShippingList