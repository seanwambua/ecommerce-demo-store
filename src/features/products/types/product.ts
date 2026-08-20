export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: ProductImage;
  brand?: Brand;
  category: Category;
  keywords?: string[]; // Array of keywords for search functionality
  inventory?: Inventory;
  review?: Review[];
  discount?: Discount[];
}

export interface ProductImage {
  id: string;
  featuredImageLink: string;
  productShowCaseLinks: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Brand {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Discount {
  id: string;
  code: string;
  description?: string;
  percentage: number; // e.g., 10 for 10% off
  validFrom: Date;
  validUntil: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Inventory {
  productId: string;
  quantity: number;
  lastUpdated: Date;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number; // e.g., 1 to 5
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}
