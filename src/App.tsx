import { Routes, Route } from "react-router";
import ProductListing from "../src/features/products/components/ProductListing";
import { Spinner } from "./components/ui/spinner";
import { useFetchProducts } from "./features/products/hooks/useProducts";
import Home from "./pages/Home";
import ProductItemRoute from "./features/products/routes/ProductItemRoute";

export default function App() {
  const { products, loading, error } = useFetchProducts();

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-neutral-100 gap-2 animate-pulse">
        <Spinner data-icon="inline-start" />
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-neutral-100">
        <span className="text-red-900">An error occurred: {error}</span>
      </div>
    );
  }

  return (
    <div className="antialiased flex flex-col justify-center items-center min-h-screen bg-neutral-100 p-0">
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route
          path="/catalog"
          element={<ProductListing products={products} />}
        />

        <Route
          path={"/products/:id"}
          element={<ProductItemRoute products={products} />}
        />
      </Routes>
    </div>
  );
}
