import { useParams } from "react-router";
import ProductItemPage from "../components/ProductItemPage"
import type { Product } from "../types";

interface ProductItemRouteProps {
  products: Product[];
}

export default function ProductItemRoute({ products }: ProductItemRouteProps) {
  const { id } = useParams<{ id: string }>();
  const productItem = products.find((p) => p.id === id);

  return <ProductItemPage productItem={productItem as Product} />;
}