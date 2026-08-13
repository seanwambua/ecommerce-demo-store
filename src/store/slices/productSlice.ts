import type { StateCreator } from "zustand";
import type { Product } from "../../types";

export interface ProductFilters {
  categoryId?: string;
  brandId?: string;
  keyword?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface ProductSlice {
  products: Product[];
  selectedProduct: Product | null;
  filters: ProductFilters;
  isLoadingProducts: boolean;

  setProducts: (products: Product[]) => void;
  upsertProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  selectProduct: (product: Product | null) => void;
  setFilters: (filters: Partial<ProductFilters>) => void;
  resetFilters: () => void;
  setLoadingProducts: (loading: boolean) => void;

  // derived
  getFilteredProducts: () => Product[];
}

export const createProductSlice: StateCreator<
  ProductSlice,
  [],
  [],
  ProductSlice
> = (set, get) => ({
  products: [],
  selectedProduct: null,
  filters: {},
  isLoadingProducts: false,

  setProducts: (products) => set({ products }),

  upsertProduct: (product) =>
    set((state) => {
      const exists = state.products.some((p) => p.id === product.id);
      return {
        products: exists
          ? state.products.map((p) => (p.id === product.id ? product : p))
          : [...state.products, product],
      };
    }),

  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== productId),
      selectedProduct:
        state.selectedProduct?.id === productId ? null : state.selectedProduct,
    })),

  selectProduct: (product) => set({ selectedProduct: product }),

  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),

  resetFilters: () => set({ filters: {} }),

  setLoadingProducts: (loading) => set({ isLoadingProducts: loading }),

  getFilteredProducts: () => {
    const { products, filters } = get();
    return products.filter((p) => {
      if (filters.categoryId && p.category.id !== filters.categoryId) return false;
      if (filters.brandId && p.brand?.id !== filters.brandId) return false;
      if (filters.minPrice !== undefined && p.price < filters.minPrice) return false;
      if (filters.maxPrice !== undefined && p.price > filters.maxPrice) return false;
      if (filters.keyword) {
        const kw = filters.keyword.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(kw);
        const matchesKeywords = p.keywords?.some((k) =>
          k.toLowerCase().includes(kw)
        );
        if (!matchesName && !matchesKeywords) return false;
      }
      return true;
    });
  },
});
