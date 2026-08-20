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
