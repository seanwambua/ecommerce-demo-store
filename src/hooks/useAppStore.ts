import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import {
  type AuthSlice,
  createAuthSlice,
} from "../features/auth/store/authSlice";
import {
  type CartSlice,
  createCartSlice,
} from "../features/checkout/store/cartSlice";
import {
  type ProductSlice,
  createProductSlice,
} from "../features/products/store/productSlice";
import {
  type OrderSlice,
  createOrderSlice,
} from "../features/checkout/store/orderSlice";
import {
  type NotificationSlice,
  createNotificationSlice,
} from "../features/notifications/store/notificationSlice";

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
        name: "thrift-africa",
        storage: createJSONStorage(() => localStorage),
        // Only persist state that should survive a refresh — never cache
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
