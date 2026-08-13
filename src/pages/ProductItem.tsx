import type { Product } from "../types";

interface ProductItemProps {
    product: Product
}

export default function ProductItem ({product}:ProductItemProps) {
    const productItem = product;
    return (
        <>
            <h3 className="flex text-bold text-center text-lg">{productItem.name}</h3>
        </>
    )
}