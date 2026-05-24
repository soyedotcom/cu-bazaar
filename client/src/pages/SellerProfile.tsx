import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/axios";

type SellerData = {
  shopName: string;
  description?: string;
  logo?: string;
  user: { name: string; createdAt: string };
  products: { id: string; name: string; image: string; price: number }[];
};

const SellerProfile = () => {
  const { shopName } = useParams<{ shopName: string }>();
  const { user } = useAuth();
  const [seller, setSeller] = useState<SellerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isOwner = user?.sellerProfile?.shopName === shopName;

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/seller`);
        setSeller(res.data.data.seller);
      } catch {
        setError("Shop not found");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [shopName]);

  if (loading) return <p className="mx-25 my-10">Loading...</p>;
  if (error || !seller) return <p className="mx-25 my-10">{error}</p>;

  return (
    <main className="flex flex-col mx-25 my-10">
      <div className="flex flex-col gap-10">
        <section className="flex justify-between items-center">
          <div className="flex flex-col gap-2 text-left">
            <h1 className="font-bold text-[45px]">{seller.shopName}</h1>
            {seller.description && (
              <p className="text-gray-500">{seller.description}</p>
            )}
            <p className="text-sm text-gray-400">
              Shop opened:{" "}
              {new Date(seller.user.createdAt).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {isOwner && (
            <button className="border-2 rounded-full h-10 px-6 cursor-pointer">
              Edit Shop
            </button>
          )}
        </section>

        <section className="flex flex-col gap-4 text-left">
          <h2 className="font-bold text-[24px]">Products</h2>
          {seller.products.length === 0 ? (
            <p className="text-gray-500">No products listed yet.</p>
          ) : (
            <div className="grid grid-cols-6 gap-5">
              {seller.products.map((p) => (
                <div key={p.id} className="flex flex-col gap-2">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-40 w-full object-cover rounded-lg"
                  />
                  <p className="font-bold text-sm">{p.name}</p>
                  <p className="text-sm">₦{Number(p.price).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default SellerProfile;
