import { products } from "../data/products";
import { useSearchParams } from "react-router-dom";
import ProductDisplay from "../components/ProductDisplay";
import SubNav from "../components/SubNav";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLocaleLowerCase() || "";

  const filteredProducts = products.filter((p) =>
    p.name.toLocaleLowerCase().includes(query),
  );

  return (
    <main className="flex flex-col mx-25 my-10">
      <SubNav />
      <ProductDisplay products={filteredProducts} />
    </main>
  );
};

export default Shop;
