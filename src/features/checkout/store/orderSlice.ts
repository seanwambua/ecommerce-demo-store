import type { StateCreator } from "zustand";
import type { Order } from "../../products/types";

export interface OrderSlice {
  orders: Order[];
  isLoadingOrders: boolean;

  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  setLoadingOrders: (loading: boolean) => void;

  getOrdersByUser: (userId: string) => Order[];
}

export const createOrderSlice: StateCreator<OrderSlice, [], [], OrderSlice> = (
  set,
  get
) => ({
  orders: [],
  isLoadingOrders: false,

  setOrders: (orders) => set({ orders }),

  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),

  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, status, updatedAt: new Date() } : o
      ),
    })),

  setLoadingOrders: (loading) => set({ isLoadingOrders: loading }),

  getOrdersByUser: (userId) => get().orders.filter((o) => o.userId === userId),
});
