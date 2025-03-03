interface FilterProducts {
    priceMax?: number,
    search?: string,
    category?: string,
    priceMin?: number,
    page?: number,
    limit?: number
}

interface FilterUsers {
    page?: number,
    limit?: number,
    search?: string,
}