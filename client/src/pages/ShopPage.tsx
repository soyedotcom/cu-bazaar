import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/axios";
import ProductDisplay from "../components/ProductDisplay";
import type { Product } from "../types/product";

type ShopData = {
  shopName: string;
  description?: string;
  logo?: string;
  user: { name: string; createdAt: string };
  products: Product[];
};

const ShopPage = () => {
  const { shopName } = useParams<{ shopName: string }>();
  const [shop, setShop] = useState<ShopData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await api.get(`/shop/store/${shopName}`);
        setShop(res.data.data.seller);
      } catch {
        setError("Shop not found");
      } finally {
        setLoading(false);
      }
    };
    fetchShop();
  }, [shopName]);

  if (loading) return <p className="mx-25 my-10">Loading...</p>;
  if (error || !shop) return <p className="mx-25 my-10">{error}</p>;

  return (
    <main className="flex flex-col mx-25 my-10">
      <section className="flex flex-col gap-3 text-left border-b pb-8 mb-8">
        <h1 className="font-bold text-[45px]">{shop.shopName}</h1>
        {shop.description && (
          <p className="text-gray-500 max-w-xl">{shop.description}</p>
        )}
        <div className="flex flex-col gap-1   text-gray-400">
          <p>Managed by {shop.user.name}</p>
          <p>
            Shop opened:{" "}
            {new Date(shop.user.createdAt).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p>
            {shop.products.length} product
            {shop.products.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      <ProductDisplay products={shop.products} />
    </main>
  );
};

export default ShopPage;
