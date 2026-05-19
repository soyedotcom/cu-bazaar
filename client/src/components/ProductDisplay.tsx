import ProductCard from "./ProductCard";
import type { Product } from "../data/products";

interface Props {
  products: Product[];
}

const ProductDisplay = ({ products }: Props) => {
  return (
    <section className="grid grid-cols-6 justify-between py-10 gap-y-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductDisplay;
