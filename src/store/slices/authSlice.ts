import type { StateCreator } from "zustand";
import type { Admin, Buyer, User, UserRole, Vendor } from "../../types/index";

export interface AuthSlice {
  user: User | null;
  role: UserRole | null;
  // Only one of these is populated, matching `role`
  buyerProfile: Buyer | null;
  vendorProfile: Vendor | null;
  adminProfile: Admin | null;
  isAuthenticated: boolean;

  setUser: (user: User) => void;
  setBuyerProfile: (buyer: Buyer) => void;
  setVendorProfile: (vendor: Vendor) => void;
  setAdminProfile: (admin: Admin) => void;
  logout: () => void;
}

const initialAuthState = {
  user: null,
  role: null,
  buyerProfile: null,
  vendorProfile: null,
  adminProfile: null,
  isAuthenticated: false,
} satisfies Omit<
  AuthSlice,
  "setUser" | "setBuyerProfile" | "setVendorProfile" | "setAdminProfile" | "logout"
>;

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (
  set
) => ({
  ...initialAuthState,

  setUser: (user) => set({ user, isAuthenticated: true }),

  setBuyerProfile: (buyer) =>
    set({ buyerProfile: buyer, role: "buyer", vendorProfile: null, adminProfile: null }),

  setVendorProfile: (vendor) =>
    set({ vendorProfile: vendor, role: "vendor", buyerProfile: null, adminProfile: null }),

  setAdminProfile: (admin) =>
    set({ adminProfile: admin, role: "admin", buyerProfile: null, vendorProfile: null }),

  logout: () => set({ ...initialAuthState }),
});
