'use client'
import React from 'react'
import Link from 'next/link'
import { icons } from '@/app/common/icons'
import { useDispatch, useSelector } from 'react-redux'
import { setCollapseSidebar } from '../services/sidebar.slice'
import { PATH } from '@/app/common/path'
import { usePathname } from 'next/navigation'
import { setConfigDropDown, setOrderDropDown, setPaymentDropDown, setProductDropDown } from '../services/dropdown.slice'
import { logout } from '../services/auth.service'
import menuItems from '../common/menu.items'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

const AdminSideBar: React.FC = () => {
    // icons
    const { MdCancel, FaChevronDown, MdLogout } = icons
    // hooks
    const { isCollapsed } = useSelector((state: any) => state.sidebar)
    const { isOrder, isProduct, isConfig, isPayment } = useSelector((state: any) => state.dropdown)
    const dispatch = useDispatch()
    const currentPath = usePathname()
    const session = useSession()

    const toggleDropdown = (dropdownType: string) => {
        switch (dropdownType) {
            case 'isOrder':
                dispatch(setOrderDropDown(!isOrder))
                break
            case 'isProduct':
                dispatch(setProductDropDown(!isProduct))
                break
            case 'isConfig':
                dispatch(setConfigDropDown(!isConfig))
                break
            case 'isPayment':
                dispatch(setPaymentDropDown(!isPayment))
                break
            default:
                break
        }
    }

    const dropdownType = (dropdownType: string) => {
        switch (dropdownType) {
            case 'isOrder':
                return isOrder
            case 'isProduct':
                return isProduct
            case 'isConfig':
                return isConfig
            case 'isPayment':
                return isPayment
            default:
                return ""
        }
    }

    return (
        <aside className={`${!isCollapsed ? '-left-[250px] md:hidden' : 'left-0 md:block'} absolute md:relative transition-all duration-300 select-none z-20 flex-shrink-0 w-[250px] p-1 overflow-y-auto bg-orange-400 h-screen`}>
            <div className='text-xl'>
                <div className='p-3 flex items-center justify-between text-white'>
                    <div className='flex items-center'>
                        <Image width={48} height={60} className="object-cover" priority src='/assets/logo.png' alt='logo' sizes="width: 100%, height: 100%" />
                        <h1 className='font-bold ml-3'>63 Car</h1>
                    </div>
                    <MdCancel className='w-5 h-5' onClick={() => { dispatch(setCollapseSidebar(!isCollapsed)) }} />
                </div>
                <div className='my-2 bg-gray-600 h-[1px]'></div>
            </div>
            {
                menuItems.map((v, i) => {
                    return (
                        v.isAuthorized(session.data?.user.isAdmin!) ? v.isParent ?
                            <div className='mt-3 text-white' key={i}>
                                <div className='p-2 flex items-center rounded-md cursor-pointer hover:bg-orange-600' onClick={() => toggleDropdown(v.toggleType!)}>
                                    {v.icon}
                                    <div className='flex justify-between w-full items-center'>
                                        <span className='text-sm ml-4 text-gray-200'>{v.name}</span>
                                        <span className={`${dropdownType(v.toggleType!) ? 'rotate-180' : ''}`}>
                                            <FaChevronDown className='w-4 h-4' />
                                        </span>
                                    </div>
                                </div>
                                <div className={`${dropdownType(v.toggleType!) ? '' : 'hidden'} text-left mx-auto text-gray-200`}>
                                    {
                                        v.children?.map((child, j) => {
                                            return (
                                                <Link key={j} className={`${currentPath === child.path ? 'bg-orange-600' : ''} p-2 mt-3 flex items-center rounded-md cursor-pointer hover:bg-orange-600 text-white`} href={child.path!}>
                                                    {child.icon}
                                                    <span className='flex-1 text-sm ml-4 text-gray-200'>{child.name}</span>
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                            </div> :
                            <Link key={i} className={`${currentPath === v.path ? 'bg-orange-600' : ''} p-2 mt-3 flex items-center rounded-md cursor-pointer hover:bg-orange-600 text-white`} href={v.path!}>
                                {v.icon}
                                <span className='text-sm ml-4 text-gray-200'>{v.name}</span>
                            </Link> : <React.Fragment key={i} />
                    )
                })
            }
            {/* Đăng xuất */}
            <div className='p-2 mt-3 flex items-center rounded-md cursor-pointer hover:bg-orange-600 text-white' onClick={async () => { await logout() }}>
                <MdLogout className='w-5 h-5' />
                <span className='text-sm ml-4 text-gray-200'>Đăng xuất</span>
            </div>
        </aside >
    )
}

export default AdminSideBar