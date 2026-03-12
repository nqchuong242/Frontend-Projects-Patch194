export interface IProduct {
    id: number;
    name: string;
    price: number;
    thumbnail: string;
    isBestSeller: boolean;
    isAvailable: boolean;
}

export interface IProductDTO {
    name: string;
    price: number;
    thumbnail: string;
    isBestSeller: boolean;
    isAvailable: boolean;
}