import { products } from "../data/products";
import ProductDisplay from "../components/ProductDisplay";
import SubNav from "../components/SubNav";

const Shop = () => {
  return (
    <div>
      <SubNav />
      <ProductDisplay products={products} />
    </div>
  );
};

export default Shop;
