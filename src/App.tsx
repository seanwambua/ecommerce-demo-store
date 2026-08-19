// import ProductListing from "./pages/ProductListing";
// import { Spinner } from "./components/ui/spinner";
// import { useFetchProducts } from "./hooks/useProducts";
import { sampleProduct } from "./data/products";
// import Home from "./pages/Home";
import ProductItem from "./pages/ProductItem";

export default function App() {
  // const { products, loading, error } = useFetchProducts();

  // if (loading) {
  //   return (
  //     <div className="flex flex-row justify-center items-center flex flex-col min-h-screen bg-neutral-100 items-center gap-2 animate-pulse">
  //       <Spinner data-icon="inline-start" />
  //       <span>Loading...</span>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="justify-center items-center flex flex-col min-h-screen bg-neutral-100">
  //       <span className="text-red-900">An error occurred: {error}</span>
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="antialiased justify-center items-center flex flex-col min-h-screen bg-neutral-100 p-0">
        {/* <ProductListing products={products} /> */}
        <ProductItem productItem={sampleProduct} />
      </div>
    </>
  );
}
