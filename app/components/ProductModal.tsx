'use client'
import CustomImagePicker from '@/app/components/CustomImagePicker'
import React, { FormEvent, useEffect, useState } from 'react'
import { uploadFilesHook } from '../hooks/common.hooks'
import { useDispatch } from 'react-redux'
import { setIsLoadingOverlay } from '../services/common.slice'
import { getBrandsHook } from '../hooks/brand.hook'
import { createProductHook, updateProductHook } from '../hooks/product.hook'
import { getCarTypesHook } from '../hooks/cartype.hook'

const ProductModal: React.FC<{ selectedProduct?: Product, page: number }> = ({ selectedProduct, page }) => {
    // hooks
    const [images, setImages] = useState<{ file: File | null, url: string }[]>([])
    const { data: brands, isLoading: loadingBrands } = getBrandsHook(1)
    const { data: cartypes, isLoading: loadingCarTypes } = getCarTypesHook(1)
    const update = updateProductHook(page)
    const create = createProductHook(page)
    const upload = uploadFilesHook()
    const dispatch = useDispatch()

    useEffect(() => {
        if (selectedProduct !== undefined) {
            if (selectedProduct.images!.length > 0) {
                const detailImages: { file: File | null, url: string }[] = []
                for (let i = 0; i < selectedProduct.images!.length; i++) {
                    detailImages.push({ file: null, url: selectedProduct.images![i] })
                }
                setImages(detailImages)
            }
        }
    }, [])

    const handleProductAction = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(setIsLoadingOverlay(true))
        const currentTarget = e.currentTarget
        const formData = new FormData(currentTarget)
        // let tempImages = images.map(image => image.url)
        // if (images.length > 0) {
        //     const imageForm = new FormData()
        //     for (let i = 0; i < images.length; i++) {
        //         if (images[i].file != null) {
        //             imageForm.set('file', images[i].file!)
        //             await new Promise((resolve) => {
        //                 uploadHook.mutate(imageForm, {
        //                     onSuccess(data) {
        //                         tempImages[i] = data.url
        //                         resolve(null);
        //                     }
        //                 })
        //             })
        //         }
        //     }
        // }
        // formData.delete('file')
        const product: Product = Object.fromEntries(formData.entries())
        product['images'] = ["https://static.wixstatic.com/media/b4dcef_85bd32cc5b8e4580ab3f2f236bedbab5~mv2.png/v1/fill/w_889,h_353,al_c/b4dcef_85bd32cc5b8e4580ab3f2f236bedbab5~mv2.png"]
        if (selectedProduct !== undefined) {
            update.mutate({ product, id: selectedProduct!._id! })
        } else {
            create.mutate({ product })
        }
        dispatch(setIsLoadingOverlay(false))
    }

    return (
        <div className='w-full py-4 max-w-[1440px] mx-auto'>
            <form className='w-full' onSubmit={handleProductAction}>
                {/* Menu */}
                <div className='bg-white mb-4 rounded-md overflow-hidden'>
                    <div className='text-sm relative cursor-pointer'>
                        <div className='flex flex-wrap items-center h-14'>
                            <div className='px-4 hover:text-blue-500 active'>Thông tin cơ bản</div>
                            <div className='px-4 hover:text-blue-500'>Thông tin chi tiết</div>
                            <div className='px-4 hover:text-blue-500'>Thông tin bán hàng</div>
                            <div className='px-4 hover:text-blue-500'>Vận chuyển</div>
                            <div className='px-4 hover:text-blue-500'>Thông tin khác</div>
                        </div>
                        <div className='absolute left-0 bottom-0 w-[137px] h-[3px] bg-blue-500'></div>
                    </div>
                </div>
                {/* Thông tin cơ bản */}
                <section className='overflow-hidden rounded-md bg-white mb-4 shadow-lg'>
                    <div className='p-2 md:p-6'>
                        <div className='panel-header'>
                            <div className='text-xl font-semibold mb-10'>Thông tin cơ bản </div>
                        </div>
                        <div className='text-sm'>
                            <div className='panel-content'>
                                <div className=''>
                                    {/* Hình ảnh */}
                                    <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                        <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                            <span className='text-red-500'>*</span>
                                            <span>Hình ảnh sản phẩm</span>
                                        </div>
                                        <div className=''>
                                            <div className=''>
                                                <div className=''>
                                                    <CustomImagePicker id='images' setImages={setImages} images={images} limit={9} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Ảnh bìa */}
                                    <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                        <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                            <span className='text-red-500'>*</span>
                                            <span>Ảnh bìa</span>
                                        </div>
                                        <div className='flex items-center'>
                                            <div className=''>
                                                <CustomImagePicker id='banner' isDisabled={true} isMultiple={false} hideEdit={true} images={images}
                                                />
                                            </div>
                                            <div className='ml-6 text-xs text-gray-400'>
                                                <ul>
                                                    <li className='list-disc'>Tải lên hình ảnh 1:1.</li>
                                                    <li className='list-disc'>Ảnh bìa sẽ được hiển thị tại các trang Kết quả tìm kiếm, Gợi ý hôm nay,... Việc sử dụng ảnh bìa đẹp sẽ thu hút thêm lượt truy cập vào sản phẩm của bạn</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Tên */}
                                    <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                        <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                            <span className='text-red-500'>*</span>
                                            <span>Tên sản phẩm</span>
                                        </div>
                                        <div className='w-full'>
                                            <div className=''>
                                                <input placeholder='Tên sản phẩm + Thương hiệu + Model + Thông số kỹ thuật' type='text' name='name' defaultValue={selectedProduct?.name ?? ''}
                                                    className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Loại nhiên liệu */}
                                    <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                        <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                            <span className='text-red-500'>*</span>
                                            <span>Loại nhiên liệu</span>
                                        </div>
                                        <div className='w-full'>
                                            <div className=''>
                                                <select defaultValue={selectedProduct?.fuelType} className='border-gray-300 p-2 border rounded-md w-full outline-none' name='fuelType'>
                                                    {
                                                        ["petrol", "diesel", "electric", "hybrid"].map(fuel => {
                                                            return (
                                                                <option key={fuel} value={fuel}>{fuel}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Loại hộp số */}
                                    <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                        <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                            <span className='text-red-500'>*</span>
                                            <span>Loại hộp số</span>
                                        </div>
                                        <div className='w-full'>
                                            <div className=''>
                                                <select defaultValue={selectedProduct?.transmission} className='border-gray-300 p-2 border rounded-md w-full outline-none' name='transmission'>
                                                    {
                                                        ["manual", "automatic"].map(transmission => {
                                                            return (
                                                                <option key={transmission} value={transmission}>{transmission}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Động cơ */}
                                    <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                        <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                            <span className='text-red-500'>*</span>
                                            <span>Động cơ</span>
                                        </div>
                                        <div className='w-full'>
                                            <div className=''>
                                                <input placeholder='Tên động cơ' type='text' name='engine' defaultValue={selectedProduct?.engine ?? ''}
                                                    className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Mã lực */}
                                    <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                        <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                            <span className='text-red-500'>*</span>
                                            <span>Mã lực</span>
                                        </div>
                                        <div className='w-full'>
                                            <div className=''>
                                                <input placeholder='Số mã lực' type='number' name='horsepower' defaultValue={selectedProduct?.horsepower ?? 0}
                                                    className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Số ghế */}
                                    <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                        <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                            <span className='text-red-500'>*</span>
                                            <span>Só ghế</span>
                                        </div>
                                        <div className='w-full'>
                                            <div className=''>
                                                <input placeholder='Số mã lực' type='number' name='numberseats' defaultValue={selectedProduct?.numberseats ?? 0}
                                                    className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Năm sản xuất */}
                                    <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                        <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                            <span className='text-red-500'>*</span>
                                            <span>Năm sản xuất</span>
                                        </div>
                                        <div className='w-full'>
                                            <div className=''>
                                                <select defaultValue={selectedProduct?.year} className='border-gray-300 p-2 border rounded-md w-full outline-none' name='year'>
                                                    {
                                                        [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025].map(year => {
                                                            return (
                                                                <option key={year} value={year}>{year}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Status */}
                                    <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                        <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                            <span className='text-red-500'>*</span>
                                            <span>Trạng thái</span>
                                        </div>
                                        <div className='w-full'>
                                            <div className=''>
                                                <select defaultValue={selectedProduct?.status} className='border-gray-300 p-2 border rounded-md w-full outline-none' name='status'>
                                                    {
                                                        ["online", "offline"].map(status => {
                                                            return (
                                                                <option key={status} value={status}>{status}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Số KM đã đi */}
                                    <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                        <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                            <span className='text-red-500'>*</span>
                                            <span>Số KM đã đi</span>
                                        </div>
                                        <div className='w-full'>
                                            <div className=''>
                                                <input placeholder='Số KM đã đi' type='number' name='kmtraveled' defaultValue={selectedProduct?.kmtraveled ?? 0}
                                                    className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Màu sắc */}
                                    <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                        <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                            <span className='text-red-500'>*</span>
                                            <span>Màu sắc</span>
                                        </div>
                                        <div className='w-full'>
                                            <div className=''>
                                                <input placeholder='Màu sắc' type='text' name='color' defaultValue={selectedProduct?.color ?? ''}
                                                    className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Description */}
                                    <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                        <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                            <span className='text-red-500'>*</span>
                                            <span>Mô tả sản phẩm</span>
                                        </div>
                                        <div className='w-full'>
                                            <div className='product-description'>
                                                <div className=''>
                                                    <textarea className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none'
                                                        defaultValue={selectedProduct?.description ?? ''} rows={9} name='description'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Loại xe */}
                                    <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                        <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                            <span className='text-red-500'>*</span>
                                            <span>Loại xe</span>
                                        </div>
                                        <div className='w-full'>
                                            <div className=''>
                                                <select defaultValue={selectedProduct?.carType} className='border-gray-300 p-2 border rounded-md w-full outline-none' name='carType'>
                                                    {loadingCarTypes ?
                                                        <option value='' disabled>Không có dữ liệu</option> :
                                                        cartypes.data && (cartypes.data as CarType[]).map(cartype => {
                                                            return (
                                                                <option key={cartype._id} value={cartype._id}>{cartype.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Thương hiệu */}
                                    <div className='flex flex-col md:flex-row items-start md:items-center'>
                                        <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                            <span className='text-red-500'>*</span>
                                            <span>Thương hiệu</span>
                                        </div>
                                        <div className='w-full'>
                                            <div className=''>
                                                <select defaultValue={selectedProduct?.brand} className='border-gray-300 p-2 border rounded-md w-full outline-none' name='brand'>
                                                    {loadingBrands ?
                                                        <option value='' disabled>Không có dữ liệu</option> :
                                                        brands.brands && (brands?.brands as Brand[]).map(brand => {
                                                            return (
                                                                <option key={brand._id} value={brand._id}>{brand.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Thông tin bán hàng (biến thể) */}
                <section className='overflow-hidden rounded-md bg-white mb-4 shadow-lg'>
                    <div className='p-2 md:p-6'>
                        <div className='panel-header'>
                            <div className='text-xl font-semibold mb-10'>Thông tin bán hàng</div>
                        </div>
                        <div className='text-sm'>
                            <div className='panel-content'>
                                <div className=''>
                                    {/* Giá */}
                                    <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                        <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                            <span className='text-red-500'>*</span>
                                            <span>Giá</span>
                                        </div>
                                        <div className='w-full'>
                                            <div className=''>
                                                <input placeholder='Nhập vào' type='number' defaultValue={selectedProduct?.price ?? 0} name='price'
                                                    className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Kho hàng */}
                                    <div className='flex flex-col md:flex-row items-start md:items-center mb-5'>
                                        <div className='flex-none mr-3 w-36 text-start md:text-end'>
                                            <span className='text-red-500'>*</span>
                                            <span>Kho hàng</span>
                                        </div>
                                        <div className='w-full'>
                                            <div className=''>
                                                <input placeholder='Nhập vào' type='number' min={0} defaultValue={selectedProduct?.stock ?? 0} name='stock'
                                                    className='border-gray-300 p-2 border focus:border-blue-500 rounded-md w-full outline-none'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Hoàn thành */}
                <section className='py-4 px-6 bg-white rounded-md'>
                    <div className='wrapper'>
                        <div className='space-x-4 text-end'>
                            <button type='reset' className='rounded-md py-2 px-4 border border-gray-300 bg-white'>
                                <span>Hủy</span>
                            </button>
                            <button className='rounded-md bg-blue-300 text-white py-2 px-4'>
                                <span>Lưu & Hiển thị</span>
                            </button>
                        </div>
                    </div>
                </section>
            </form>
        </div>
    )
}

export default ProductModal