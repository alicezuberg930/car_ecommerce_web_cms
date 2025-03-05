"use client"
import React, { FormEvent, useState } from "react";
import dynamic from "next/dynamic";
import ContactConfiguration from "@/app/components/ContactConfig";
import { createContactHook, getContactHook } from "@/app/hooks/contact.hook";
const CustomCKEditor = dynamic(() => import('@/app/components/CustomCKEditor'), {
    ssr: false // Prevents Editor.js from being included in server-side rendering
});

const ContactPage: React.FC = () => {
    const { data: contacts } = getContactHook()
    const create = createContactHook()
    const [companyInfo, setCompanyInfo] = useState<string>("")

    const updateSitecontacts = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const contact: Contact = Object.fromEntries(formData.entries())
        create.mutate({ contact })
    }

    const getContacts = () => {
        const contactEls = document.getElementsByClassName('contact')
        let contacts = []
        let label: string = "", phone: string = "", email: string = ""
        for (let i = 0; i < contactEls.length; i++) {
            label = (contactEls[i].children[0].children[1] as HTMLInputElement).value
            phone = (contactEls[i].children[1].children[1] as HTMLInputElement).value
            email = (contactEls[i].children[2].children[1] as HTMLInputElement).value
            contacts.push({ label, phone, email })
        }
        return contacts
    }

    return (
        <div className='w-full'>
            <div className='text-black'>
                <div className='p-3 bg-[#f5f5f5]'>
                    <h3 className='text-red-500 font-semibold'>Thông tin công ty</h3>
                </div>
                <div className='p-3'>
                    <form onSubmit={(e) => updateSitecontacts(e)}>
                        <table className='w-full'>
                            <tbody>
                                <tr className='bg-[#347ab6] text-white'>
                                    <td></td>
                                    <td className='font-bold text-sm py-3'>Thông tin công ty</td>
                                </tr>

                                <tr>
                                    <td className='py-2'>Công ty<b className='text-red-500'>*</b></td>
                                    <td className='py-2'>
                                        <input defaultValue={contacts?.data?.company} name="company" className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' type='text' required autoComplete='off' />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-2'>Địa chỉ<b className='text-red-500'>*</b></td>
                                    <td className='py-2'>
                                        <input defaultValue={contacts?.data?.address} name="address" className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' type='text' required autoComplete='off' />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-2'>Tel/Điện thoại bàn<b className='text-red-500'>*</b></td>
                                    <td className='py-2'>
                                        <input defaultValue={contacts?.data?.telephone} name="telephone" className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' type='text' required autoComplete='off' maxLength={11} />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-2'>Điện thoại chính<b className='text-red-500'>*</b></td>
                                    <td className='py-2'>
                                        <input defaultValue={contacts?.data?.phone} name="phone" className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' type='text' required autoComplete='off' maxLength={11} />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-2'>Hotline<b className='text-red-500'>*</b></td>
                                    <td className='py-2'>
                                        <input defaultValue={contacts?.data?.hotline} name="hotline" className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' type='text' required autoComplete='off' maxLength={10} />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-2'>Email chính<b className='text-red-500'>*</b></td>
                                    <td className='py-2'>
                                        <input defaultValue={contacts?.data?.email} name="email" className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' type='text' required autoComplete='off' />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-2'>Giờ làm việc<b className='text-red-500'>*</b></td>
                                    <td className='py-2'>
                                        <textarea defaultValue={contacts?.data?.openHour} name="openHour" className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-2'>Footer: thông tin giới thiệu</td>
                                    <td className='py-2'>
                                        <textarea defaultValue={contacts?.data?.footerInfo} name="footerInfo" className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-2'>Thông tin công ty/Footer</td>
                                    <td className='py-2'>
                                        <CustomCKEditor value={setCompanyInfo} defaultValue="" />
                                    </td>
                                </tr>

                                <tr className='bg-[#347ab6] text-white'>
                                    <td >&nbsp;</td>
                                    <td className='font-bold text-sm py-3'>Chat online</td>
                                </tr>

                                <tr>
                                    <td className='py-2'>URL: Zalo OA</td>
                                    <td className='py-2'>
                                        <input defaultValue={contacts?.data?.zaloChatURL} name="zaloChatURL" className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' type="text" />
                                    </td>
                                </tr>

                                <tr>
                                    <td className='py-2'>URL: FB Messenger</td>
                                    <td className='py-2'>
                                        <input defaultValue={contacts?.data?.facebookChatURL} name="facebookChatURL" className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' type="text" />
                                    </td>
                                </tr>

                                <tr className='bg-[#347ab6] text-white'>
                                    <td >&nbsp;</td>
                                    <td className='font-bold text-sm py-3'>Mạng xã hội</td>
                                </tr>
                                <tr>
                                    <td className='py-2'>Facebook</td>
                                    <td className='py-2'>
                                        <input defaultValue={contacts?.data?.facebookPage} name="facebookPage" className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' type="text" />
                                    </td>
                                </tr>
                                {/* <tr>
                                    <td className='py-2'>Linkedin</td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <input className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' type="text" />
                                    </td>
                                </tr> */}
                                <tr>
                                    <td className='py-2'>Youtube</td>
                                    <td className='py-2'>
                                        <input defaultValue={contacts?.data?.youtubePage} name="youtubePage" className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' type="text" />
                                    </td>
                                </tr>
                                {/* <tr>
                                    <td className='py-2'>Instagram</td>
                                    <td className='py-2'>:</td>
                                    <td className='py-2'>
                                        <input className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' type="text" />
                                    </td>
                                </tr> */}
                                <tr>
                                    <td className='py-2'>Google</td>
                                    <td className='py-2'>
                                        <input defaultValue={contacts?.data?.googlePage} name="googlePage" className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' type="text" />
                                    </td>
                                </tr>

                                <tr className='bg-[#347ab6] text-white'>
                                    <td >&nbsp;</td>
                                    <td className='font-bold text-sm py-3'>Google Maps</td>
                                </tr>
                                <tr>
                                    <td className='py-2'>Google Maps</td>
                                    <td className='py-2'>
                                        <p className="p-3 bg-[#fdf8e3] rounded-lg mb-4 text-xs text-[#8e8359]">
                                            - Truy cập vào website <a href="https://www.google.com/maps/" className="font-bold text-red-400" target="_blank">https://www.google.com/maps/</a><br />
                                            - Search tìm vị trí trên bản đồ Google Maps (Nhập địa chỉ vào textbox search)<br />
                                            - Click Menu =&gt; Share =&gt; Popup Share xuất hiện =&gt; tab: Embed a map =&gt; click copy HTML
                                            <a href="https://fshoppii.com/assets/back/img/guild-googlemap.jpg" className="btn btn-xs btn-primary" target="_blank">
                                                <i className="fa fa-share-square"></i> Hình minh hoạ
                                            </a>
                                            <br />
                                            - Pase nội dùng vừa copy vào textbox bên dưới
                                        </p>
                                        <textarea defaultValue={contacts?.data?.googleMap} name="googleMap" rows={5} className='outline-none rounded-md border p-2 border-gray-300 w-full focus:border-blue-500' />
                                    </td>
                                </tr>

                                <tr>
                                    <td >&nbsp;</td>
                                    <td>
                                        <div className='space-x-3 font-bold text-md'>
                                            <input type='submit' className='rounded-md p-3 outline-none bg-[#347ab6] text-white' value='Xác Nhận' />
                                            <input type='reset' className='rounded-md p-3 outline-none bg-[#eeeeee]' value='Nhập Lại' />
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div >
    );
}

export default ContactPage
