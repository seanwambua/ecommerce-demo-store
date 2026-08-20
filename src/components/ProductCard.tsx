import { EyeIcon, ShoppingCart } from "lucide-react";
import type { Product } from "../types";
import type React from "react";
import { Link } from "react-router";
import { Button } from "./ui/button";
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
    <div  key={product.id} className="max-w-90 group border-0 border-zinc-300 bg-white text-neutral-400 overflow-hidden shadow-xl hover:shadow-2xl transition-shadow gap-0">
      <div className="bg-zinc-900 overflow-hidden">
        <img
          src={product.image?.featuredImageLink}
          alt={product.name}
          className="max-w-[100]/2 fill object-cover group-hover:scale-110 shadow-orange-300 transition-transform duration-300"
        />
      </div>
      <div className="p-4 space-y-4">
        <div className="flex items-start justify-between p4 gap-2">
          <div>
            {product.brand ? (
              <p className="text-sm font-light tracking-wide text-zinc-700 pb-2">
                {product.brand.name}
              </p>
            ) : (
              <></>
            )}
            <p className="font-normal text-black text-lg p-0">{product.name}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="pl-2 text-sm text-zinc-600 font-bold">
            {"KES " + product.price.toLocaleString("KE")}
          </span>
          <span className="pl-2 text-sm text-zinc-400 font-normal">
            {product.review?.length + " review(s)"}
          </span>
        </div>

        <div className="flex gap-6 items-center justify-evenly">
          <Button onClick={handleAddToCart} className={"bg-neutral-700 rounded-none"}>
            <ShoppingCart size={15} />
            {inStock ? "Add to cart" : "Out of Stock"}
          </Button>

          <Link key={product.id} to={`/products/${product.id}`}>
            <Button variant={"outline"} className={"rounded-none border border-zinc-300 text-zinc-600"}>
              <EyeIcon size={15} />
              View Product
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
