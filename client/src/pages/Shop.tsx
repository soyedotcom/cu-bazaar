import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { fetchProducts } from "../api/product.ts";
import type { Product } from "../types/product.ts";

import ProductDisplay from "../components/ProductDisplay";
import SubNav from "../components/SubNav";
import LoadMoreItemsBtn from "../components/LoadMoreItemsBtn";

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);

  const prevFilterKey = useRef("");

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLocaleLowerCase() || "";
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");
  const section = searchParams.get("section");

  const filterKey = `${query}-${category}-${subcategory}-${section}`;

  useEffect(() => {
    const controller = new AbortController(); //remove later
    const filtersChanged = prevFilterKey.current !== filterKey;
    const currentPage = filtersChanged ? 1 : page;

    if (filtersChanged) {
      prevFilterKey.current = filterKey;
    }

    if (filtersChanged) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    const load = async () => {
      try {
        const data = await fetchProducts({
          q: query || undefined,
          category,
          subcategory,
          section,
          page: currentPage,
          limit: 20,
        });

        const incoming = data.data.products || [];

        if (filtersChanged) {
          setProducts(incoming);
        } else {
          setProducts((prev) => [...prev, ...incoming]);
        }

        setHasMore(data.data.pagination.hasMore);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    load();
    return () => controller.abort(); //remove later
  }, [filterKey, page, category, subcategory, section, query]);

  return (
    <main className="flex flex-col mx-25 my-10">
      <SubNav />

      <section className="flex flex-col">
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <>
            <ProductDisplay products={products} />

            {hasMore && (
              <div className="flex justify-center mt-8">
                {loadingMore ? (
                  <p>Loading more...</p>
                ) : (
                  <LoadMoreItemsBtn onClick={() => setPage((p) => p + 1)} />
                )}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default Shop;
