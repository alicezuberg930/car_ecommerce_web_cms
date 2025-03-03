interface ShippingAddress {
    PickupAddress?: Address,
    ReturnAddress?: Address,
    _id?: string,
    pick_name?: string,
    pick_tel?: string,
    pick_email?: string,
    return_name?: string,
    return_tel?: string,
    return_email?: string
}

interface Address {
    provinces?: {
        _id?: string,
        name?: string
    },
    districts?: {
        _id?: string,
        name?: string
    },
    wards?: {
        _id?: string,
        name?: string
    },
    street?: string
}
