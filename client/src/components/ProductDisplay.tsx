import ProductCard from "./ProductCard";
import type { Product } from "../data/products";

interface Props {
  products: Product[];
}

const ProductDisplay = ({ products }: Props) => {
  return (
    <section>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductDisplay;
