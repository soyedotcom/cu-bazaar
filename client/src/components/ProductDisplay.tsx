import ProductCard from "./ProductCard";
import type { Product } from "../data/products";

interface Props {
  products: Product[];
}

const ProductDisplay = ({ products }: Props) => {
  return (
    <section className="grid grid-cols-6 gap-y-10 justify-between py-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductDisplay;
