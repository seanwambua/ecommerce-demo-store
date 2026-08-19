import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { type AuthSlice, createAuthSlice } from "./slices/authSlice";
import { type CartSlice, createCartSlice } from "./slices/cartSlice";
import { type ProductSlice, createProductSlice } from "./slices/productSlice";
import { type OrderSlice, createOrderSlice } from "./slices/orderSlice";
import {
  type NotificationSlice,
  createNotificationSlice,
} from "./slices/notificationSlice";

export type AppStore = AuthSlice &
  CartSlice &
  ProductSlice &
  OrderSlice &
  NotificationSlice;

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (...a) => ({
        ...createAuthSlice(...a),
        ...createCartSlice(...a),
        ...createProductSlice(...a),
        ...createOrderSlice(...a),
        ...createNotificationSlice(...a),
      }),
      {
        name: "thrift-africa-store",
        storage: createJSONStorage(() => localStorage),
        // Only persist state that should survive a refresh — never cache
        // fetched catalog/order/notification data or loading flags.
        partialize: (state) => ({
          user: state.user,
          role: state.role,
          buyerProfile: state.buyerProfile,
          vendorProfile: state.vendorProfile,
          adminProfile: state.adminProfile,
          isAuthenticated: state.isAuthenticated,
          cartUserId: state.cartUserId,
          items: state.items,
          totalAmount: state.totalAmount,
        }),
      },
    ),
    { name: "ThriftAfricaStore" },
  ),
);

// Convenience selector hooks — keep components subscribed to only what they need
export const useAuth = () =>
  useAppStore((s) => ({
    user: s.user,
    role: s.role,
    buyerProfile: s.buyerProfile,
    vendorProfile: s.vendorProfile,
    adminProfile: s.adminProfile,
    isAuthenticated: s.isAuthenticated,
    setUser: s.setUser,
    setBuyerProfile: s.setBuyerProfile,
    setVendorProfile: s.setVendorProfile,
    setAdminProfile: s.setAdminProfile,
    logout: s.logout,
  }));

export const useCart = () =>
  useAppStore((s) => ({
    items: s.items,
    totalAmount: s.totalAmount,
    addToCart: s.addToCart,
    removeFromCart: s.removeFromCart,
    updateItemQuantity: s.updateItemQuantity,
    clearCart: s.clearCart,
  }));
