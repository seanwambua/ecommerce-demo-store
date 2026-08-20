import { Routes, Route } from "react-router";
import ProductListing from "./pages/ProductListing";
import ProductItem from "./pages/ProductItemPage";
import { Spinner } from "./components/ui/spinner";
import { useFetchProducts } from "./hooks/useProducts";
import Home from "./pages/Home";

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
        {products.map((product) => (
          <Route
            path={"/products/:id"}
            element={<ProductItem productItem={product} />}
          />
        ))}
      </Routes>
    </div>
  );
}
