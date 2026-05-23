import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
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
  seller: {
    shopName: string;
  };

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
      setLoading(true);
      try {
        const data = await fetchProducts({
          q: query || undefined,
          category,
          subcategory,
          section,
        });
        setProducts(data.data.products || []);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [query, category, subcategory, section]);

  return (
    <main className="flex flex-col mx-25 my-10">
      <SubNav />

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <ProductDisplay products={products} />
      )}
    </main>
  );
};

export default Shop;
