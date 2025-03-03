enum type {
    "percentage",
    "fixedamount",
    "freeshipping"
}

interface Voucher {
    _id?: string,
    voucherCode?: string,
    discountType?: type,
    discountValue?: number,
    applicableProducts?: string[],
    startDate?: string,
    endDate?: string,
    usageLimit?: number,
    minOrderValue?: number,
    status?: string,
    applicableUsers?: string[]
}