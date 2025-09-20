export interface Price {
    value: number;
    currency: string;
    unit: string;
}
export interface Calories {
    value: number;
    unit: string;
    per: string;
}
export interface ProductAttributes {
    organic: boolean;
    shelf_life: string;
    calories: Calories;
}
export interface ReviewDetails {
    average: number;
    total_reviews: number;
}
export interface Reviews {
    average_rating: number;
    count: number;
    detailed: ReviewDetails;
}
export interface MultiLanguageName {
    en: string;
    ar: string;
}
export interface IProduct {
    _id?: string;
    id: string;
    name: MultiLanguageName;
    category: string;
    price: Price;
    images: string[];
    description: string;
    attributes: ProductAttributes;
    reviews: Reviews;
    createdAt: Date;
    updatedAt: Date;
}
export interface ApiResponse<T = any> {
    success: boolean;
    data: T;
    message?: string;
    error?: any;
    errors?: any[];
}
export interface PaginationQuery {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
}
export interface ProductFilters extends PaginationQuery {
    category?: string;
    organic?: boolean;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
}
export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}
//# sourceMappingURL=index.d.ts.map