'use client'
import { formatVND } from "@/app/common/utils"
import axioInstance from "@/app/configs/axios.config"
import { updateOrderHook } from "@/app/hooks/order.hooks"
import { readShippingListTagHook } from "@/app/hooks/shipping.address.hook"
import Image from "next/image"
import { FormEvent, useEffect, useRef, useState } from "react"

const OrderDetails: React.FC<{ id: string }> = ({ id }) => {
    const [order, setOrder] = useState<Order | null>()
    const { data: shippingTags } = readShippingListTagHook()
    const [tags, setTags] = useState<string[]>([])
    const update = updateOrderHook()
    const noteRef = useRef<HTMLTextAreaElement>(null)

    const handleProcessOrder = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        update.mutate({ id, body: { tags, note: noteRef.current!.value } })
    }

    useEffect(() => {
        const fetchOrderDetails = async (id: string) => {
            try {
                const response = await axioInstance({ url: `/order/detail/${id}` })
                setOrder(response.data.order)
                console.log(response.data.order);
            } catch (error) {
                setOrder(null)
            }
        }
        fetchOrderDetails(id)
    }, [])

    return (
        <>
            {order != null ? <div className='w-full'>
                <div>
                    <div className='bg-[#f5f5f5] p-3'>
                        <h3 className='font-semibold text-red-500'>Thông tin đơn hàng: {order?._id}</h3>
                    </div>
                    <div className='p-3'>
                        <form onClick={handleProcessOrder}>
                            <table className='w-full text-sm'>
                                <tbody>
                                    <tr>
                                        <td className='py-3 px-2 w-36'>Mã đơn hàng</td>
                                        <td className='py-3'>
                                            <span className="font-semibold text-red-900">{order?.orderCode}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='py-3 px-2 w-36'>Trạng thái đơn</td>
                                        <td className='py-3'>
                                            <div className="text-white">
                                                <span className="bg-blue-300 p-1.5 rounded-md">{order?.status}</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='py-3 px-2 w-36'>Giá trị đơn</td>
                                        <td className='py-3'>
                                            <span className="font-semibold text-red-900">{formatVND(order!.discountedPrice != null ? order?.discountedPrice! : order?.totalPrice!)}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='py-3 px-2 w-36'>Ngày đặt</td>
                                        <td className='py-3'>
                                            <span className="">{order!.createdAt}</span>
                                        </td>
                                    </tr>

                                    <tr className='bg-[#347ab6] text-white'>
                                        <td colSpan={2} className='py-3 px-2 uppercase font-bold text-sm'>Thông tin người mua</td>
                                    </tr>
                                    <tr>
                                        <td className='py-3 px-2 w-36'>Họ tên</td>
                                        <td className='py-3'>
                                            <span className="">{order!.userId?.name}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='py-3 px-2 w-36'>Địa chỉ</td>
                                        <td className='py-3'>
                                            <span className="">{`${order?.address?.street}, ${order?.address?.wards?.name}, ${order?.address?.districts?.name}, ${order?.address?.province?.name}`}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='py-3 px-2 w-36'>Điện thoại</td>
                                        <td className='py-3'>
                                            <span className="">09249731014</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='py-3 px-2 w-36'>Email</td>
                                        <td className='py-3'>
                                            <span className="">{order?.userId?.email}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='py-3 px-2 w-36'>Yêu cầu</td>
                                        <td className='py-3'>
                                            <span className="">frtgyhuytgt gt3yujyhrtgr heyujrhytegrwf yhuyrtegrfwe</span>
                                        </td>
                                    </tr>

                                    <tr className='bg-[#347ab6] text-white'>
                                        <td colSpan={2} className='py-3 px-2 uppercase font-bold text-sm'>Thông tin thanh toán</td>
                                    </tr>
                                    <tr>
                                        <td className='py-3 px-2 w-36'>Giá trị đơn hàng</td>
                                        <td className='py-3'>
                                            <span className="">{formatVND(order!.discountedPrice != null ? order?.discountedPrice! : order?.totalPrice!)}</span>
                                        </td>
                                    </tr>
                                    {/* <tr>
                                        <td className='py-3 px-2 w-36'>Hình thức</td>
                                        <td className='py-3'>
                                            <span className="font-semibold text-[#347ab6]">COD - thanh toán khi nhận hàng</span>
                                            <p>Quý khách vui lòng thanh toán dựa trên hoá đơn bán hàng</p>
                                        </td>
                                    </tr> */}

                                    <tr className='bg-[#347ab6] text-white'>
                                        <td colSpan={2} className='py-3 px-2 uppercase font-bold text-sm'>Ghi chú đơn hàng</td>
                                    </tr>
                                    {/* <tr>
                                        <td className='py-3 px-2 w-36'>Ghi chú</td>
                                        <td className='py-3'>
                                            <span className="">fbeiw wriue ierue eriufhgiqee qeoir oeiqrfioqer quirfqr</span>
                                        </td>
                                    </tr> */}
                                </tbody>
                            </table>
                            {/* chi tiết sản phẩm */}
                            <table className="text-sm w-full mt-6">
                                <tbody>
                                    <tr className='bg-[#347ab6] text-white'>
                                        <td colSpan={5} className='py-3 px-2 uppercase font-bold text-sm'>Thông tin sản phẩm</td>
                                    </tr>
                                    <tr className="font-semibold">
                                        <td className='py-3 px-2 w-28'>Hình SP</td>
                                        <td className='py-3 px-2'>Thông tin sản phẩm</td>
                                        <td className='py-3 text-center'>Số lượng</td>
                                        <td className='py-3 text-right'>Giá bán</td>
                                        <td className='py-3 px-2 text-right'>Thành tiền</td>
                                    </tr>
                                    {
                                        order ? order.items?.map((item, i) => {
                                            let quantity = 0
                                            item.options![i].value?.forEach(n => {
                                                quantity += n!.quantity!
                                            })
                                            return (
                                                <tr key={item.productId?._id}>
                                                    <td className='py-3 px-2'>
                                                        <Image alt="" className="rounded-md border" width={84} height={84} src={item.productId?.images![0]!} />
                                                    </td>
                                                    <td className='py-3 px-2'>
                                                        <span className="font-semibold">{item.name}</span>
                                                        <p>Mã SP: {item.productId?._id}</p>
                                                    </td>
                                                    <td className='py-3 text-center'>{quantity}</td>
                                                    <td className='py-3 text-right'>{item.productId?.price}</td>
                                                    {/* <td className='py-3 px-2 text-right font-semibold'>593.000</td> */}

                                                </tr>
                                            )
                                        }) : <></>
                                    }
                                    <tr className="bg-blue-200">
                                        <td colSpan={4} className="py-3 uppercase font-semibold text-right">Tạm tính</td>
                                        <td className="text-right py-3 px-2 font-semibold">{1000000}</td>
                                    </tr>
                                </tbody>
                            </table>
                            {/* xử lý sản phẩm */}
                            <table className='w-full text-sm mt-6'>
                                <tbody>
                                    <tr className='bg-[#347ab6] text-white'>
                                        <td colSpan={2} className='py-3 px-2 uppercase font-bold text-sm'>Xử lý đơn hàng</td>
                                    </tr>

                                    <tr>
                                        <td className='py-3 px-2 w-36'>Trạng thái đơn</td>
                                        <td className='py-3'>
                                            <div className='flex flex-wrap gap-2 text-white text-xs'>
                                                <label className='bg-[#5ac0dd] p-2 rounded-md flex items-center gap-1'>
                                                    <input type='radio' value='processing' name='tinhtrang' disabled />
                                                    <b>Đơn hàng mới</b>
                                                </label>
                                                <label className='bg-yellow-300 p-2 rounded-md flex items-center gap-1'>
                                                    <input type='radio' value='pending' name='tinhtrang' />
                                                    <b>Đợi giao hàng</b>
                                                </label>

                                                <label className='bg-green-400 p-2 rounded-md flex items-center gap-1'>
                                                    <input type='radio' value='shipped' name='tinhtrang' defaultChecked />
                                                    <b>Đã giao</b>
                                                </label>
                                                <label className='bg-red-500 p-2 rounded-md flex items-center gap-1'>
                                                    <input type='radio' value='cancel' name='tinhtrang' defaultChecked />
                                                    <b>Hủy đơn</b>
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='py-3 px-2 w-36'>Ghi chú</td>
                                        <td className='py-3'>
                                            <textarea ref={noteRef} className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none' rows={5} placeholder="Ghi chú đơn hàng" />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="py-3 w-32"></td>
                                        <td className='py-3 font-bold text-sm flex flex-wrap gap-3'>
                                            {
                                                tags.length > 0 && tags.map(tag => {
                                                    return (
                                                        <div className="rounded-md bg-blue-300 p-2 text-white" key={tag}>
                                                            {tag}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className='py-3 px-2 w-36'>Chọn tag<b className='text-red-500'>*</b></td>
                                        <td className='py-3'>
                                            <select onChange={(e) => setTags(prev => [...prev, e.target.value])} className='border-gray-300 p-2 border rounded-md w-full outline-none'>
                                                {
                                                    shippingTags && shippingTags.data ? shippingTags.data.map((tag: { title: string, des: string }) => {
                                                        return (
                                                            (tag.title && <option key={tag.title} value={tag.title}>{tag.title}</option>)
                                                        )
                                                    }) : <option>Không có danh sách</option>
                                                }
                                            </select>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td></td>
                                        <td>
                                            <div className='space-x-3 font-bold text-md'>
                                                <input type='submit' className='bg-[#347ab6] p-3 rounded-md text-white outline-none' value='Lưu thông tin' />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div> : <></>
            }
        </>
    )
}

export default OrderDetails