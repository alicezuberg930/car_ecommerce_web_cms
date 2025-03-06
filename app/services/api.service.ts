import { API } from "../common/api"
import axioInstance, { instanceWithoutToken } from "../configs/axios.config"
// file
export const uploadFile = async ({ file }: { file: FormData }) => {
    const response = await axioInstance({ url: 'https://future-be-act6.onrender.com/files/upload/image', method: "POST", data: file })
    return response.data
}

// login
export const login = async ({ phone, password }: { phone: any, password: any }) => {
    const response = await instanceWithoutToken<any>({ url: API.LOGIN, method: "POST", data: { phone, password } })
    return response.data
}

// thương hiệu
export const getBrands = async () => {
    const response = await instanceWithoutToken<any>({ url: API.BRANDS, method: "GET" })
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
    const response = await instanceWithoutToken<any>({ url: API.PRODUCTS, method: "POST", params: filters })
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
    const response = await instanceWithoutToken<any>({ url: API.CARTYPES, method: "GET" })
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

// banner
export const createBanner = async ({ banner }: { banner: Banner }) => {
    const response = await axioInstance<any>({ url: API.CREATE_BANNER, method: "POST", data: banner })
    return response.data
}

export const updateBanner = async ({ id, banner }: { id: string, banner: Banner }) => {
    const response = await axioInstance<any>({ url: API.UPDATE_BANNER(id), method: "PUT", data: banner })
    return response.data
}

export const deleteBanner = async ({ id }: { id: string }) => {
    const response = await axioInstance<any>({ url: API.DELETE_BANNER(id), method: "DELETE" })
    return response.data
}

export const getBanners = async () => {
    const response = await axioInstance<any>({ url: API.BANNERS, method: "GET" })
    return response.data
}

// tin tức
export const getNews = async () => {
    const response = await axioInstance<any>({ url: API.NEWS, method: "GET" })
    return response.data
}

export const createNews = async ({ n }: { n: New }) => {
    const response = await axioInstance<any>({ url: API.CREATE_NEW, method: "POST", data: n })
    return response.data
}

export const updateNews = async ({ id, n }: { id: string, n: New }) => {
    const response = await axioInstance<any>({ url: API.UDPATE_NEW(id), method: "PUT", data: n })
    return response.data
}

// thông tin
export const getSiteConfigs = async () => {
    return await axioInstance<any>({ url: "API.CONFIGS", method: "GET" }).then(res => res.data)
}

export const createContact = async ({ contact }: { contact: Contact }) => {
    const response = await axioInstance<any>({ url: API.CREATE_CONTACT, method: "POST", data: contact })
    return response.data
}


// ảnh
export const getImages = async () => {
    const response = await instanceWithoutToken<any>({ url: API.IMAGES, method: "GET" })
    return response.data
}

export const createImage = async ({ image }: { image: Image }) => {
    const response = await axioInstance<any>({ url: API.CREATE_IMAGE, method: "POST", data: image })
    return response.data
}

export const updateImage = async ({ image, id }: { image: Image, id: string }) => {
    const response = await axioInstance<any>({ url: API.UPDATE_IMAGE(id), method: "PUT", data: image })
    return response.data
}

export const deleteImage = async ({ id }: { id: string }) => {
    const response = await axioInstance<any>({ url: API.DELETE_IMAGE(id), method: "DELETE" })
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