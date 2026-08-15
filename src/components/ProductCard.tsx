import { ShoppingCart } from "lucide-react";
import type { Product } from "../types";
import type React from "react";
interface ProductCardProps {
  product: Product;
  addToCart?: React.FunctionComponent;
}

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  const inStock = Boolean(product.inventory?.quantity);

  /**
   * A function to add product items to zustand cart store.
   * @returns void
   */
  function handleAddToCart() {
    if (!inStock || !addToCart) return;
    addToCart(product);
  }
    
  return (
    <div className="w-full group rounded-2xl border border-2 border-zinc-600 bg-zinc-200 text-neutral-400 overflow-hidden  shadow-lg hover:shadow-xl transition-shadow gap-0">
      <div className="aspect-square bg-zinc-900 overflow-hidden">
        <img
          src={product.image?.featuredImageLink}
          alt={product.name}
          className="w-full h-full fill object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 space-y-2 ">
        <div className="flex items-start justify-between p4 gap-2">
          <div>
            {product.brand ? (
              <p className="text-sm font-light tracking-wide text-zinc-700 pb-2">
                {product.brand.name}
              </p>
            ) : (
              <></>
            )}
            <p className="font-normal text-black text-lg p-0">
              {product.name}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="pl-2 text-sm text-zinc-600 font-bold">
            {"KES " + product.price.toLocaleString("KE")}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className={`w-full border border-2 border-zinc-400 mt-2 flex items-center justify-center gap-2 rounded-xl py-2 text-sm font-medium transition-colors ${
            inStock
              ? "bg-neutral-900 text-zinc-300 hover:bg-black" 
              : "bg-neutral-100 text-zinc-600 cursor-not-allowed"
          }`}
        >
          <ShoppingCart size={15} />
          {inStock ? "Add to cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}
