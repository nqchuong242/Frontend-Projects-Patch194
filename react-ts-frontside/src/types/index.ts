export interface MenuItem {
  id: string;
  name: string;
  price: number;
  thumbnail: string;
  description?: string;
  sizes?: { name: string; priceAdjustment: number }[];
}

export interface CartItem extends MenuItem {
  qty: number;
  selectedSize?: string;
  note?: string;
}

export interface Category {
  category: string;
  items: MenuItem[];
}

export interface ITable {
  id: string;
  name: string;
}

export interface IProduct {
    id: number;
    name: string;
    price: number;
    thumbnail: string;
    isBestSeller: boolean;
    isAvailable: boolean;
}
