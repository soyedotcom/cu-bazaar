import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { fetchProducts } from "../api/product.ts";

import ProductDisplay from "../components/ProductDisplay";
import SubNav from "../components/SubNav";

type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  features?: string[];
  measurements?: string;
  materialsandcare?: string;

  price: number;
  seller: string;

  variants?: {
    colors?: string[];
    sizes?: string[];
  };

  category: string;
  subcategory: string;
  section: string;
  tags?: string[];
};

const Shop = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  const [searchParams] = useSearchParams();

  const query = searchParams.get("q")?.toLocaleLowerCase() || "";
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");
  const section = searchParams.get("section");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data.data.products || []);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
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
  }, [products, query, category, subcategory, section]);

  return (
    <main className="flex flex-col mx-25 my-10">
      <SubNav />

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <ProductDisplay products={filteredProducts} />
      )}
    </main>
  );
};

export default Shop;
