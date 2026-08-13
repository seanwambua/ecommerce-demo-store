import { ShoppingCart } from "lucide-react";
import type { Product } from "../types";
import type React from "react";
interface ProductCardProps {
  product: Product;
  addToCart?: React.FunctionComponent;
}

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  console.log("Product Details: " + { product });
  return (
    <div className="w-full group rounded-2xl border border-0 bg-zinc-200 text-neutral-400 overflow-hidden  shadow-md hover:shadow-xl transition-shadow gap-0">
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
              <p className="text-sm font-light tracking-wide text-neutral-900 pb-2">
                {product.brand.name}
              </p>
            ) : (
              <></>
            )}
            <p className="font-normal text-neutral-600 text-lg p-0">
              {product.name}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="pl-2 text-md text-zinc-600 font-semibold">
            {"KES " + product.price.toLocaleString("KE")}
          </span>
        </div>

        <button
          onClick={addToCart}
          className={`w-full mt-2 flex items-center justify-center gap-2 rounded-xl py-2 text-sm font-medium transition-colors ${
            product.inventory?.quantity
              ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
              : "bg-neutral-900 text-white hover:bg-neutral-700"
          }`}
        >
          <ShoppingCart size={15} />
          {product.inventory?.quantity ? "Out of Stock" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
