'use client'

import type { Product } from "../types";
import ProductCard from "../components/ProductCard";

interface ProductListingProps {
  products: Product[];
}

export default function ProductListing({ products }: ProductListingProps) {
  return (
    <div className="min-h-screen">
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {products.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-10">No products found.</p>
        )}
      </main>
    </div>
  );
}
