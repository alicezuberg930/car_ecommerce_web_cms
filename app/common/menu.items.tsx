import path from "path"
import { icons } from "./icons"
import { PATH } from "./path"

const { CiBarcode, FaShippingFast, MdBrandingWatermark, MdFileUpload, BiCategory, PiFlagBanner, MdOutlinePayment, MdOutlinePayments, FaUser, FaBoxOpen, CiShoppingBasket, PiShippingContainer, VscSettings, LuLayoutDashboard } = icons

const menuItems = [
    {
        isAuthorized: (check: boolean) => check || !check,
        isParent: false,
        name: "Thống kê",
        path: PATH.DASHBOARD,
        icon: <LuLayoutDashboard className='w-5 h-5' />
    },
    {
        isAuthorized: (check: boolean) => check || !check,
        isParent: false,
        name: "Giao hàng",
        path: PATH.SHIPPING,
        icon: <FaShippingFast className='w-5 h-5' />
    },
    {
        isAuthorized: (check: boolean) => check || !check,
        isParent: false,
        name: "Mã khuyến mãi",
        path: PATH.VOUCHERS,
        icon: <CiBarcode className='w-5 h-5' />
    },
    {
        isAuthorized: (check: boolean) => check || !check,
        isParent: false,
        name: "Thương hiệu",
        path: PATH.BRANDS,
        icon: <MdBrandingWatermark className='w-5 h-5' />
    },
    {
        isAuthorized: (check: boolean) => check || !check,
        isParent: false,
        name: "Danh mục",
        path: PATH.CATEGORIES,
        icon: <BiCategory className='w-5 h-5' />
    },
    {
        isAuthorized: (check: boolean) => check || !check,
        isParent: false,
        name: "Banner",
        path: PATH.BANNERS,
        icon: <PiFlagBanner className='w-5 h-5' />
    },
    {
        isAuthorized: (check: boolean) => check,
        isParent: false,
        name: "Người dùng",
        path: PATH.USERS,
        icon: <FaUser className='w-5 h-5' />
    },
    {
        isAuthorized: (check: boolean) => check || !check,
        isParent: true,
        name: "Đơn hàng",
        icon: <PiShippingContainer className="w-5 h-5" />,
        toggleType: "isOrder",
        children: [
            {
                name: "Tất cả đơn hàng",
                path: PATH.ORDERS_ALL,
                icon: <PiShippingContainer className='w-5 h-5' />,
            },
            // {
            //     name: "Đơn hàng đang xử lý",
            //     path: PATH.ORDERS_ALL,
            //     icon: <PiShippingContainer className='w-5 h-5' />
            // },
            // {
            //     name: "Đơn hàng thành công",
            //     path: PATH.ORDERS_ALL,
            //     icon: <PiShippingContainer className='w-5 h-5' />
            // },
            // {
            //     name: "Tất cả đơn hàng",
            //     path: PATH.ORDERS_ALL,
            //     icon: <PiShippingContainer className='w-5 h-5' />
            // },
        ]
    },
    {
        isAuthorized: (check: boolean) => check || !check,
        isParent: true,
        name: "Sản phẩm",
        icon: <FaBoxOpen className='w-5 h-5' />,
        toggleType: "isProduct",
        children: [
            {
                name: "Sản phẩm đang bán",
                path: PATH.PRODUCTS,
                icon: <FaBoxOpen className='w-5 h-5' />,
            },
            // {
            //     name: "Đang giảm giá",
            //     path: PATH.PRODUCT_CURRENT,
            //     icon: <FaBoxOpen className='w-5 h-5' />
            // },
            // {
            //     name: "Sản phẩm đang ẩn",
            //     path: PATH.PRODUCT_CURRENT,
            //     icon: <FaBoxOpen className='w-5 h-5' />
            // },
        ]
    },
    {
        isAuthorized: (check: boolean) => check || !check,
        isParent: true,
        name: "Cấu hình",
        icon: <VscSettings className='w-5 h-5' />,
        toggleType: "isConfig",
        children: [
            // {
            //     name: "Cấu hình email",
            //     path: PATH.SITE_CONFIG,
            //     icon: <VscSettings className='w-5 h-5' />,
            // },
            {
                name: "Cấu hình site",
                path: PATH.SITE_CONFIG,
                icon: <VscSettings className='w-5 h-5' />,
            }
        ]
    },
    // {
    //     isAuthorized: (check: boolean) => !check,
    //     isParent: true,
    //     name: "Thanh toán",
    //     icon: <MdOutlinePayment className='w-5 h-5' />,
    //     toggleType: "isPayment",
    //     children: [
    //         {
    //             name: "Phương thức thanh toán",
    //             path: PATH.PAYMENT_METHODS,
    //             icon: <MdOutlinePayment className='w-5 h-5' />,
    //         },
    //         {
    //             name: "Lịch sử thanh toán",
    //             path: PATH.PAYMENT_METHODS,
    //             icon: <MdOutlinePayment className='w-5 h-5' />,
    //         }
    //     ]
    // }
]

export default menuItems