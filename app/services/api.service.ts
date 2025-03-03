import { API } from "../common/api"
import axioInstance, { instanceWithoutToken } from "../configs/axios.config"
// file
export const uploadFile = async ({ file }: { file: FormData }) => {
    const response = await axioInstance({ url: 'https://future-be-act6.onrender.com/files/upload/image', method: "POST", data: file })
    return response.data
}

// login
export const login = async ({ phone, password }: { phone: any, password: any }) => {
    const response = await instanceWithoutToken<any>({ url: `${API.LOGIN}`, method: "POST", data: { phone, password } })
    return response.data
}

// thương hiệu
export const getBrands = async () => {
    const response = await instanceWithoutToken<any>({ url: `${API.BRANDS}`, method: "GET" })
    return response.data
}

export const createBrand = async ({ brand }: { brand: Brand }) => {
    const response = await axioInstance<any>({ url: API.CREATE_BRAND, method: "POST", data: brand })
    return response.data
}

export const updateBrand = async ({ brand, id }: { brand: Brand, id: string }) => {
    const response = await axioInstance<any>({ url: API.UPDATE_BRAND(id), method: "PUT", data: brand })
    return response.data
}

export const deleteBrand = async ({ id }: { id: string }) => {
    const response = await axioInstance<any>({ url: API.DELETE_BRAND(id), method: "DELETE" })
    return response.data
}

// sản phẩm
export const getProducts = async (filters: ProductFilter) => {
    const response = await instanceWithoutToken<any>({ url: `${API.PRODUCTS}`, method: "POST", params: filters })
    return response.data
}

export const getProductDetails = async ({ id }: { id: string }) => {
    const response = await instanceWithoutToken<any>({ url: API.PRODUCT_DETAILS(id), method: "GET" })
    return response.data
}

export const deleteProduct = async ({ id }: { id: string }) => {
    const response = await axioInstance<any>({ url: API.DELETE_PRODUCT(id), method: "DELETE", })
    return response.data
}

export const createProduct = async ({ product }: { product: Product }) => {
    const response = await axioInstance<any>({ url: API.CREATE_PRODUCT, method: "POST", data: product })
    return response.data
}

export const updateProduct = async ({ product, id }: { product: Product, id: string }) => {
    const response = await axioInstance<any>({ url: API.UPDATE_PRODUCT(id), method: "PUT", data: product })
    return response.data
}

// loại xe
export const getCarTypes = async () => {
    const response = await instanceWithoutToken<any>({ url: `${API.CARTYPES}`, method: "GET" })
    return response.data
}

export const createCarType = async ({ cartype }: { cartype: CarType }) => {
    const response = await axioInstance<any>({ url: API.CREATE_CARTYPE, method: "POST", data: cartype })
    return response.data
}

export const deleteCarType = async ({ id }: { id: string }) => {
    const response = await axioInstance<any>({ url: API.DELETE_CARTYPE(id), method: "DELETE", })
    return response.data
}

// to be deleted
// admin 
export const lockAccount = async (lockReason: string) => {
    return await axioInstance<any>({ url: "API.LOCK", method: "POST", data: { lockReason } }).then(res => res.data)
}

export const unlockAccount = async (lockReason: string) => {
    return await axioInstance<any>({ url: "API.UNLOCK", method: "POST", data: { lockReason } }).then(res => res.data)
}

export const getUsers = async (filter?: any) => {
    return await axioInstance<any>({ url: "API.READ_USERS", method: "GET", params: filter }).then(res => res.data)
}

export const createUser = async (user: User) => {
    return await axioInstance<any>({ url: "API.CREATE_USER", method: "POST", data: user }).then(res => res.data)
}

// Cấu hình trang
export const getSiteConfigs = async () => {
    return await axioInstance<any>({ url: "API.CONFIGS", method: "GET" }).then(res => res.data)
}

export const updateSiteConfigs = async (config: any) => {
    return await axioInstance<any>({ url: "API.CONFIGS", method: "POST", data: config }).then(res => res.data)
}

// Banner
export const createBanner = async (banner: any) => {
    return await axioInstance<any>({ url: "API.CREATE_BANNER", method: "POST", data: banner }).then(res => res.data)
}

export const updateBanner = async (id: string, banner: any) => {
    return await axioInstance<any>({ url: `${"API.UPDATE_BANNER"}/${id}`, method: "PUT", params: { id }, data: banner }).then(res => res.data)
}

export const deleteBanner = async (id: string) => {
    return await axioInstance<any>({ url: `${"API.DELETE_BANNER"}/${id}`, method: "DELETE", params: { id } }).then(res => res.data)
}

export const getBanners = async () => {
    return await axioInstance<any>({ url: "API.READ_BANNERS", method: "GET" }).then(res => res.data)
}

// Voucher
export const getVouchers = async () => {
    return await axioInstance<any>({ url: "API.READ_VOUCHERS", method: "GET" }).then(res => res.data)
}

export const createVoucher = async (voucher: any) => {
    return await axioInstance<any>({ url: "API.CREATE_VOUCHER", method: "POST", data: voucher }).then(res => res.data)
}

export const approveVoucher = async (id: string) => {
    return await axioInstance<any>({ url: "API.APPROVE_VOUCHER(id)", method: "POST" }).then(res => res.data)
}