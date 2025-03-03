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
        icon: <LuLayoutDashboard size={20} />
    },
    {
        isAuthorized: (check: boolean) => check || !check,
        isParent: false,
        name: "Mã khuyến mãi",
        path: PATH.VOUCHERS,
        icon: <CiBarcode size={20} />
    },
    {
        isAuthorized: (check: boolean) => check || !check,
        isParent: false,
        name: "Thương hiệu",
        path: PATH.BRANDS,
        icon: <MdBrandingWatermark size={20} />
    },
    {
        isAuthorized: (check: boolean) => check || !check,
        isParent: false,
        name: "Loại xe",
        path: PATH.CARTYPES,
        icon: <BiCategory size={20} />
    },
    {
        isAuthorized: (check: boolean) => check || !check,
        isParent: false,
        name: "Banner",
        path: PATH.BANNERS,
        icon: <PiFlagBanner size={20} />
    },
    {
        isAuthorized: (check: boolean) => check,
        isParent: false,
        name: "Người dùng",
        path: PATH.USERS,
        icon: <FaUser size={20} />
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
                icon: <PiShippingContainer size={20} />,
            },
            // {
            //     name: "Đơn hàng đang xử lý",
            //     path: PATH.ORDERS_ALL,
            //     icon: <PiShippingContainer size={20} />
            // },
            // {
            //     name: "Đơn hàng thành công",
            //     path: PATH.ORDERS_ALL,
            //     icon: <PiShippingContainer size={20} />
            // },
            // {
            //     name: "Tất cả đơn hàng",
            //     path: PATH.ORDERS_ALL,
            //     icon: <PiShippingContainer size={20} />
            // },
        ]
    },
    {
        isAuthorized: (check: boolean) => check || !check,
        isParent: true,
        name: "Sản phẩm",
        icon: <FaBoxOpen size={20} />,
        toggleType: "isProduct",
        children: [
            {
                name: "Sản phẩm đang bán",
                path: PATH.PRODUCTS,
                icon: <FaBoxOpen size={20} />,
            },
            // {
            //     name: "Đang giảm giá",
            //     path: PATH.PRODUCT_CURRENT,
            //     icon: <FaBoxOpen size={20} />
            // },
            // {
            //     name: "Sản phẩm đang ẩn",
            //     path: PATH.PRODUCT_CURRENT,
            //     icon: <FaBoxOpen size={20} />
            // },
        ]
    },
    {
        isAuthorized: (check: boolean) => check || !check,
        isParent: true,
        name: "Cấu hình",
        icon: <VscSettings size={20} />,
        toggleType: "isConfig",
        children: [
            // {
            //     name: "Cấu hình email",
            //     path: PATH.SITE_CONFIG,
            //     icon: <VscSettings size={20} />,
            // },
            {
                name: "Cấu hình site",
                path: PATH.SITE_CONFIG,
                icon: <VscSettings size={20} />,
            }
        ]
    },
    // {
    //     isAuthorized: (check: boolean) => !check,
    //     isParent: true,
    //     name: "Thanh toán",
    //     icon: <MdOutlinePayment size={20} />,
    //     toggleType: "isPayment",
    //     children: [
    //         {
    //             name: "Phương thức thanh toán",
    //             path: PATH.PAYMENT_METHODS,
    //             icon: <MdOutlinePayment size={20} />,
    //         },
    //         {
    //             name: "Lịch sử thanh toán",
    //             path: PATH.PAYMENT_METHODS,
    //             icon: <MdOutlinePayment size={20} />,
    //         }
    //     ]
    // }
]

export default menuItems