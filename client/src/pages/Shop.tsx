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
    setPage(1);
    setProducts([]);
  }, [filterKey]);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      page === 1 ? setLoading(true) : setLoadingMore(true);

      try {
        const data = await fetchProducts({
          q: query || undefined,
          category,
          subcategory,
          section,
          page,
          limit: 20,
          signal: controller.signal,
        });

        if (controller.signal.aborted) return;

        const incoming = data.data.products || [];
        setProducts((prev) => (page === 1 ? incoming : [...prev, ...incoming]));
        setHasMore(data.data.pagination.hasMore);
      } catch (err) {
        if ((err as any)?.code !== "ERR_CANCELED") {
          console.error("Failed to load products", err);
        }
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    load();
    return () => controller.abort();
  }, [filterKey, page]);

  return (
    <main className="flex flex-col mx-25 my-10">
      <SubNav />

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
    </main>
  );
};

export default Shop;
