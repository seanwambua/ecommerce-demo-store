import type { StateCreator } from "zustand";
import type { CartItem, Product } from "../../types";

export interface CartSlice {
  cartUserId: string | null;
  items: CartItem[];
  totalAmount: number;

  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setCartUser: (userId: string | null) => void;
}

// price lookup is injected by the caller since CartItem only stores productId/quantity;
// keep a local in-memory price map so totalAmount can be recalculated on any mutation
const priceMap = new Map<string, number>();

function recalculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    const price = priceMap.get(item.productId) ?? 0;
    return sum + price * item.quantity;
  }, 0);
}

export const createCartSlice: StateCreator<CartSlice, [], [], CartSlice> = (
  set,
  get
) => ({
  cartUserId: null,
  items: [],
  totalAmount: 0,

  addToCart: (product, quantity = 1) => {
    priceMap.set(product.id, product.price);
    const existing = get().items.find((i) => i.productId === product.id);
    const items = existing
      ? get().items.map((i) =>
          i.productId === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      : [...get().items, { productId: product.id, quantity }];

    set({ items, totalAmount: recalculateTotal(items) });
  },

  removeFromCart: (productId) => {
    const items = get().items.filter((i) => i.productId !== productId);
    set({ items, totalAmount: recalculateTotal(items) });
  },

  updateItemQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    const items = get().items.map((i) =>
      i.productId === productId ? { ...i, quantity } : i
    );
    set({ items, totalAmount: recalculateTotal(items) });
  },

  clearCart: () => set({ items: [], totalAmount: 0 }),

  setCartUser: (userId) => set({ cartUserId: userId }),
});
