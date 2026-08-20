"use client";

import type { Product } from "../types/product";
import ProductCard from "../components/ProductCard";

interface ProductListingProps {
  products: Product[];
}

export default function ProductListing({ products }: ProductListingProps) {
  return (
    <div className="min-h-screen">
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
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
