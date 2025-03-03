export const API = {
    // admin
    LOCK: '/.netlify/functions/func_getAlluser',
    UNLOCK: '/.netlify/functions/func_getAlluser',
    CREATE_USER: '/user/create',
    READ_USERS: '/admin/getUsers',
    // Common
    LOGIN: '/user/login',
    UPLOAD_FILE: '/files/upload/image',
    PROFILE: '/user/profile',
    // CRUD Product 
    CREATE_PRODUCT: '/product/create',
    READ_PRODUCTS: '/product/get_list',
    DELETE_PRODUCT: '/product/delete',
    UPDATE_PRODUCT: '/product/update',
    DETAILS_PRODUCT: '/product/get_detail',
    // CRUD category
    CREATE_CATEGORY: '/category/create',
    READ_CATEGORIES: '/category/parent',
    UPDATE_CATEGORY: '/category/update-parent',
    DELETE_CATEGORY: '/category/del',
    // CRUD Sub categories
    CREATE_SUBCATEGORIES: '/category/create-chilrent',
    READ_SUBCATEGORIES: '/category/Parent',
    DELETE_SUBCATEGORIES: '/category/del-chilrent',
    UPDATE_SUBCATEGORY: '/category/update-chilrent',
    // CRUD brand
    CREATE_BRAND: '/brand/create',
    READ_BRANDS: '/brand/list',
    UPDATE_BRAND: '/brand/update',
    DELETE_BRAND: '/brand/delete',
    // CONFIG
    CONFIGS: 'https://learning-nestjs-ediw.onrender.com/api/v1/configs',
    // CRUD banners
    READ_BANNERS: '/banner/getList',
    CREATE_BANNER: '/banner/create',
    UPDATE_BANNER: '/banner/update',
    DELETE_BANNER: '/banner/delete',
    // Shippings
    SHIPPING_TAGS: '/shipping/listTag',
    SHIPPING: '/shipping/shipping-carriers',
    PROVINCES: '/location/province',
    DISTRICTS: (provinceId: string) => { return `location/${provinceId}/districts` },
    WARDS: (districtId: string) => { return `/location/districts/${districtId}` },
    // Vouchers
    READ_VOUCHERS: '/voucher/getlist',
    CREATE_VOUCHER: '/voucher/up',
    APPROVE_VOUCHER: (id: string) => { return `/voucher/approve/${id}` },
    // Orders
    PENDING_ORDER: (id: string) => `/order/pending/${id}`,
    READ_ORDERS: '/order/getlist',
}