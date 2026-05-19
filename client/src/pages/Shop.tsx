import { products } from "../data/products";
import { useSearchParams } from "react-router-dom";

import ProductDisplay from "../components/ProductDisplay";
import SubNav from "../components/SubNav";

const Shop = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q")?.toLocaleLowerCase() || "";
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");
  const section = searchParams.get("section");

  const filteredProducts = products.filter((p) => {
    const matchesQuery =
      !query ||
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.subcategory.toLowerCase().includes(query) ||
      p.section.toLowerCase().includes(query);

    const matchesCategory = !category || p.category === category;
    const matchesSubcategory = !subcategory || p.subcategory === subcategory;
    const matchesSection = !section || p.section === section;

    return (
      matchesQuery && matchesCategory && matchesSubcategory && matchesSection
    );
  });

  return (
    <main className="flex flex-col mx-25 my-10">
      <SubNav />
      <ProductDisplay products={filteredProducts} />
    </main>
  );
};

export default Shop;
