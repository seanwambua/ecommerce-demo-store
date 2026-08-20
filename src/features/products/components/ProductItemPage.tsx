"use client";

import { Share } from "lucide-react";
import { Button } from "../../../components/ui/button";
import type { Product } from "../types";

interface ProductItemPageProps {
  productItem: Product;
}

export default function ProductItemPage({ productItem }: ProductItemPageProps) {
  if (!productItem) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-zinc-500">Product not found.</p>
      </div>
    );
  }

  return (
    <section className="m-0 grid grid-cols-2 gap-0 pb-10 px-6 lg:px-20">
      <div className="w-full aspect-square">
        <img
          src={productItem.image.featuredImageLink}
          alt={productItem.name || "Product image"}
          className="rounded-none text-neutral-400 shadow-lg hover:shadow-xl transition-transform duration-200 hover:scale-[105%]"
        />
        <div className="flex gap-4 lg:gap-10 justify-center items-center p-6 lg:p-20 flex-wrap">
          {productItem.image.productShowCaseLinks.map((link, index) => (
            <img
              key={index}
              src={link}
              alt={`${productItem.name} thumbnail ${index + 1}`}
              className="max-w-[200px] border rounded-none shadow-lg transition-transform duration-300 hover:shadow-xl hover:shadow-zinc-400 hover:scale-[105%]"
            />
          ))}
        </div>
      </div>

      <div className="justify-center p-6 lg:p-20 space-y-10">
        <div className="flex items-center gap-6">
          <h1 className="text-5xl font-thin">{productItem.name}</h1>
          <Share className="text-orange-700 transition-transform duration-200 hover:text-zinc-900 cursor-pointer" />
        </div>

        <p>{productItem.description}</p>
        <div className="grid grid-cols-2 items-center">
          <div className="pt-4">
            <div className="flex gap-2 items-center">
              <p className="font-semibold text-sm">
                In Stock: {productItem.inventory?.quantity ?? "Out of Stock"}
              </p>
            </div>
            <div className="flex gap-2 pt-6 items-center">
              <span className="font-bold text-sm">Sizes:</span>
              {["SM", "MD", "LG"].map((size) => (
                <div
                  key={size}
                  className="border border-zinc-300 p-1 text-xs text-zinc-700 font-medium transition-transform duration-300 hover:shadow-lg hover:border-zinc-600 hover:underline cursor-pointer"
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
          <h3 className="text-right text-3xl font-semibold pt-6">
            {"KES " +
              (productItem.price
                ? productItem.price.toLocaleString("en-KE")
                : "0")}
          </h3>
        </div>

        <div className="flex justify-center gap-6">
          <Button className="rounded-none transition-transform duration-200 hover:shadow-lg">
            Buy Now
          </Button>
          <Button
            variant="outline"
            className="border border-zinc-400 rounded-none p-2 transition-transform duration-200 hover:border-black hover:shadow-lg"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </section>
  );
}
