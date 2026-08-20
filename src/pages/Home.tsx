import ProductCard from "../features/products/components/ProductCard";
import type { Product } from "../features/products/types";

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
const productItem = products[0];
  return (
    <>
      {/* <Hero /> */}
      <section className="flex mx-auto w-full justify-between pl-60 pr-20 gap-10 items-center">
        <h1> Section Title </h1>
        {/* <Image href="./images/showcase-1.png"/> */}
        <img
          src="./images/showcase-2.png"
          className="max-w-[800px] fill my-20 p-0 border-0 border-zinc-300 rounded-xl shadow-xl"
        />
      </section>

      <h1 className="py-10 text-3xl uppercase font-semibold">
        {" "}
        BEST FEATURES{" "}
      </h1>
      <section className="mx-10 p-20 gap-6 grid grid-cols-1  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        <ProductCard key={productItem.id} product={productItem} />
        <ProductCard key={productItem.id}product={productItem} />
        <ProductCard key={productItem.id}product={productItem} />
        <ProductCard key={productItem.id}product={productItem} />
      </section>

      <h1 className="py-10 text-3xl uppercase font-semibold">
        {" "}
        Top Discounts %
      </h1>
      <section className="mx-10 p-20 gap-6 grid grid-cols-1   lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        <ProductCard key={productItem.id} product={productItem} />
        <ProductCard key={productItem.id}product={productItem} />
        <ProductCard key={productItem.id}product={productItem} />
        <ProductCard key={productItem.id}product={productItem} />
      </section>

      <h1 className="py-10 text-3xl uppercase font-semibold">
        {" "}
        TOP RATED SELLERS
      </h1>
      <section className="mx-10 p-20 gap-6 grid grid-cols-1   lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
       <ProductCard key={productItem.id} product={productItem} />
        <ProductCard key={productItem.id}product={productItem} />
        <ProductCard key={productItem.id}product={productItem} />
        <ProductCard key={productItem.id}product={productItem} />
      </section>
    </>
  );
}
