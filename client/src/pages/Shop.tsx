import { products } from "../data/products";
import ProductDisplay from "../components/ProductDisplay";
import SubNav from "../components/SubNav";

const Shop = () => {
  return (
    <main className="flex flex-col mx-25 my-15">
      <SubNav />
      <ProductDisplay products={products} />
    </main>
  );
};

export default Shop;
