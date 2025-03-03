import axioInstance, { instanceWithoutToken } from "../configs/axios.config"
import { API } from "../common/api";
import axios from "axios";

// common
export const uploadFile = async (file: FormData) => {
    return await axioInstance({ url: `${API.UPLOAD_FILE}`, method: "POST", data: file }).then(res => res.data)
}

// người dùng
export const login = async (phone: string, password: string) => {
    let response = await instanceWithoutToken({ url: `${API.LOGIN}`, method: "POST", data: { phone, password } })
    return response.data
}

export const getProfile = async (token: string) => {
    return await instanceWithoutToken({ url: `${API.PROFILE}`, method: "GET", headers: { Authorization: `Bearer ${token}` } }).then(res => res.data)
}

// sản phẩm
export const getProducts = async (filter?: FilterProducts) => {
    return await instanceWithoutToken<any>({ url: `${API.READ_PRODUCTS}`, method: "GET", params: filter }).then(res => res.data)
}

export const createProduct = async (product: Product) => {
    return await axioInstance<any>({ url: API.CREATE_PRODUCT, method: "POST", data: product }).then(res => res.data)
}

export const updateProduct = async (id: string, product: Product) => {
    return await axioInstance<any>({ url: `${API.UPDATE_PRODUCT}/${id}`, params: { id }, method: "PUT", data: product }).then(res => res.data)
}

export const deleteProduct = async (id: string) => {
    return await axioInstance<any>({ url: `${API.DELETE_PRODUCT}/${id}`, params: { id }, method: "DELETE" }).then(res => res.data)
}

export const detailsProduct = async (id: string) => {
    return await axioInstance<any>({ url: `${API.DETAILS_PRODUCT}/${id}`, params: { id }, method: "GET" }).then(res => res.data)
}

// admin 
export const lockAccount = async (lockReason: string) => {
    return await axioInstance<any>({ url: API.LOCK, method: "POST", data: { lockReason } }).then(res => res.data)
}

export const unlockAccount = async (lockReason: string) => {
    return await axioInstance<any>({ url: API.UNLOCK, method: "POST", data: { lockReason } }).then(res => res.data)
}

export const getUsers = async (filter?: FilterUsers) => {
    return await axioInstance<any>({ url: API.READ_USERS, method: "GET", params: filter }).then(res => res.data)
}

export const createUser = async (user: User) => {
    return await axioInstance<any>({ url: API.CREATE_USER, method: "POST", data: user }).then(res => res.data)
}

// danh mục
export const getCategories = async () => {
    return await instanceWithoutToken<any>({ url: API.READ_CATEGORIES, method: "GET", }).then(res => res.data)
}

export const createCategory = async (category: Category) => {
    return await axioInstance<any>({ url: API.CREATE_CATEGORY, method: "POST", data: category, }).then(res => res.data)
}

export const updateCategory = async (id: string, category: Category) => {
    return await axioInstance<any>({ url: `${API.UPDATE_CATEGORY}/${id}`, method: "PUT", params: { id }, data: category, }).then(res => res.data)
}

export const deleteCategory = async (id: string) => {
    return await axioInstance<any>({ url: `${API.DELETE_CATEGORY}/${id}`, params: { id }, method: "DELETE", }).then(res => res.data)
}
// danh mục con
export const getSubCategories = async (id: string) => {
    return await axioInstance<any>({ url: `${API.READ_SUBCATEGORIES}/${id}`, method: "GET", params: { id } }).then(res => res.data)
}

export const createSubCategory = async (category: Category) => {
    return await axioInstance<any>({ url: API.CREATE_SUBCATEGORIES, method: "POST", data: category }).then(res => res.data)
}

export const deleteSubCategory = async (id: string) => {
    return await axioInstance<any>({ url: `${API.DELETE_SUBCATEGORIES}/${id}`, params: { id }, method: "DELETE" }).then(res => res.data)
}

export const updateSubCategory = async (id: string, category: Category) => {
    return await axioInstance<any>({ url: `${API.UPDATE_SUBCATEGORY}/${id}`, method: "PUT", params: { id }, data: category }).then(res => res.data)
}

// Cấu hình trang
export const getSiteConfigs = async () => {
    return await axios<SingleAPIResponse<Config>>({ url: API.CONFIGS, method: "GET" }).then(res => res.data)
}

export const updateSiteConfigs = async (config: Config) => {
    return await axioInstance<SingleAPIResponse<Config>>({ url: API.CONFIGS, method: "POST", data: config }).then(res => res.data)
}

// Thương hiệu
export const createBrand = async (brand: Brand) => {
    return await axioInstance<any>({ url: API.CREATE_BRAND, method: "POST", data: brand }).then(res => res.data)
}

export const updateBrand = async (id: string, brand: Brand) => {
    return await axioInstance<any>({ url: `${API.UPDATE_BRAND}/${id}`, method: "PUT", params: { id }, data: brand }).then(res => res.data)
}

export const deleteBrand = async (id: string) => {
    return await axioInstance<any>({ url: `${API.DELETE_BRAND}/${id}`, method: "DELETE", params: { id } }).then(res => res.data)
}

export const getBrands = async () => {
    return await axioInstance<any>({ url: API.READ_BRANDS, method: "GET" }).then(res => res.data)
}

// Banner
export const createBanner = async (banner: Banner) => {
    return await axioInstance<any>({ url: API.CREATE_BANNER, method: "POST", data: banner }).then(res => res.data)
}

export const updateBanner = async (id: string, banner: Banner) => {
    return await axioInstance<any>({ url: `${API.UPDATE_BANNER}/${id}`, method: "PUT", params: { id }, data: banner }).then(res => res.data)
}

export const deleteBanner = async (id: string) => {
    return await axioInstance<any>({ url: `${API.DELETE_BANNER}/${id}`, method: "DELETE", params: { id } }).then(res => res.data)
}

export const getBanners = async () => {
    return await axioInstance<any>({ url: API.READ_BANNERS, method: "GET" }).then(res => res.data)
}

// Shipping
export const getShippings = async () => {
    return await axioInstance<any>({ url: API.SHIPPING, method: "GET" }).then(res => res.data)
}

export const getShippingTags = async () => {
    return await axioInstance<any>({ url: API.SHIPPING_TAGS, method: "GET" }).then(res => res.data)
}

export const createShippings = async (shippingAddress: any) => {
    return await axioInstance<any>({ url: API.SHIPPING, method: "POST", data: shippingAddress }).then(res => res.data)
}

export const updateShippings = async (shippingAddress: any) => {
    return await axioInstance<any>({ url: API.SHIPPING, method: "PUT", data: shippingAddress }).then(res => res.data)
}

// Địa điểm
export const getProvinces = async () => {
    return await axioInstance<any>({ url: API.PROVINCES, method: "GET" }).then(res => res.data)
}

export const getDistricts = async (provinceId: string) => {
    return await axioInstance<any>({ url: API.DISTRICTS(provinceId), method: "GET" }).then(res => res.data)
}

export const getWards = async (districtId: string) => {
    return await axioInstance<any>({ url: API.WARDS(districtId), method: "GET" }).then(res => res.data)
}

// Voucher
export const getVouchers = async () => {
    return await axioInstance<any>({ url: API.READ_VOUCHERS, method: "GET" }).then(res => res.data)
}

export const createVoucher = async (voucher: Voucher) => {
    return await axioInstance<any>({ url: API.CREATE_VOUCHER, method: "POST", data: voucher }).then(res => res.data)
}

export const approveVoucher = async (id: string) => {
    return await axioInstance<any>({ url: API.APPROVE_VOUCHER(id), method: "POST" }).then(res => res.data)
}

// Order
export const getOrders = async () => {
    return await axioInstance<any>({ url: API.READ_ORDERS, method: "GET", }).then(res => res.data)
}

export const updateOrder = async (id: string, body: any) => {
    return await axioInstance<any>({ url: `${API.PENDING_ORDER(id)}`, method: "POST", data: body }).then(res => res.data)
}