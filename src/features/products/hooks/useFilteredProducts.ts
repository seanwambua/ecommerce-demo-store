// hooks/useFilteredProducts.ts
import { useMemo } from "react";
import { useProducts } from "./useCartStore";

export function useFilteredProducts() {
 const { products, filters } = useProducts();

  return useMemo(() => {
    return products.filter((p) => {
      if (filters.categoryId && p.category?.id !== filters.categoryId) return false;
      if (filters.brandId && p.brand?.id !== filters.brandId) return false;
      if (filters.minPrice !== undefined && p.price < filters.minPrice) return false;
      if (filters.maxPrice !== undefined && p.price > filters.maxPrice) return false;
      if (filters.keyword) {
        const kw = filters.keyword.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(kw);
        const matchesKeywords = p.keywords?.some((k) => k.toLowerCase().includes(kw));
        if (!matchesName && !matchesKeywords) return false;
      }
      return true;
    });
  }, [products, filters]);
}