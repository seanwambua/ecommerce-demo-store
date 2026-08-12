import { useState, useEffect } from "react";
import { getAllProducts } from "../lib/product";
import type { Product } from "../types";

export function useFetchProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const fetchedData: Product[] = await getAllProducts();
        setProducts(fetchedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  console.log(products); // Log the products to the console

  return { products, loading, error };
}
