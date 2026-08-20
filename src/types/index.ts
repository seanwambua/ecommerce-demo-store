export interface User {
  id: string;
  fname: string;
  lname: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  verified: boolean;
}

export type UserRole = "buyer" | "vendor" | "admin";

export interface Vendor {
  id: string;
  userId: string;
  name: string;
  contactEmail: string;
  contactPhone?: string;
  createdAt: Date;
  updatedAt: Date;
  address?: Address;
}

export interface Buyer {
  id: string;
  userId?: string;
  anonymous?: boolean;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  address?: Address;
}

export interface Admin {
  id: string;
  userId: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id: string;
  userId: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  productIds: string[];
  totalAmount: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

export interface Cart {
  userId: string;
  items: CartItem[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface PaymentMethod {
  id: string;
  userId: string;
  cardNumber: string; // In a real application, you would not store this directly
  cardHolderName: string;
  expirationDate: string; // MM/YY format
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  orderId: string;
  paymentMethodId: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}
