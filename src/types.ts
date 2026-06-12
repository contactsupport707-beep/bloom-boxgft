export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Category {
  _id: string;
  name: string;
  image: string;
  icon?: string;
  count: number;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string; // main image
  images?: string[]; 
  videos?: string[];
  rating: number;
  reviews: number;
  isTrending?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface AppSettings {
  payment: {
    upiId: string;
    qrCodeImage: string;
  };
  whatsapp: {
    number: string;
    enabled: boolean;
  };
}
