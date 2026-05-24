import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/axios";
import type { Product } from "../types/product";
import EditProductCard from "../components/EditProductCard";
import AddProductCard from "../components/AddProductCard";
import DeleteProductCard from "../components/DeleteProductCard";
import EditShopCard from "../components/EditShopCard";

type Seller = {
  shopName: string;
  description?: string;
  logo?: string;
  userId: string;
  products: Product[];
  orders: {
    id: number;
    productId: string;
    quantity: number;
    status: string;
    createdAt: string;
  }[];
  createdAt: string;
};

type ActiveSection = "pending" | "orders" | "transactions" | "products" | null;

const SellerProfile = () => {
  const { user } = useAuth();
  const [seller, setSeller] = useState<Seller | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState<ActiveSection>("products");

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [showAddCard, setShowAddCard] = useState(false);
  const [showEditShop, setShowEditShop] = useState(false);

  const fetchSeller = async () => {
    try {
      const res = await api.get("/seller/dashboard");
      setSeller(res.data.data.Seller);
    } catch {
      setError("Failed to load Seller Profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeller();
  }, []);

  if (loading) return <p className="mx-25 my-10">Loading...</p>;
  if (error || !seller) return <p className="mx-25 my-10">{error}</p>;

  return (
    <main className="flex flex-col mx-25 my-10">
      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-[45px]">{seller.shopName}</h1>
            <button
              onClick={() => setShowEditShop(true)}
              className="border-2 rounded-full h-10 px-6 cursor-pointer"
            >
              Edit Shop
            </button>
          </div>

          <div className="text-left flex flex-col gap-1">
            {seller.description && (
              <p className="text-gray-500">{seller.description}</p>
            )}
            <p className="  text-gray-400">
              Shop opened:{" "}
              {new Date(seller.createdAt).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-gray-400">Welcome back, {user?.name}</p>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex gap-5">
            {(
              [
                "products",
                "pending",
                "orders",
                "transactions",
              ] as ActiveSection[]
            ).map((s) => (
              <button
                key={s}
                onClick={() => setActiveSection(activeSection === s ? null : s)}
                className={`border-2 rounded-full h-10 px-5 cursor-pointer transition-all ${activeSection === s ? "bg-black text-white" : ""}`}
              >
                {s === "orders"
                  ? "Order History"
                  : s === "transactions"
                    ? "Transaction History"
                    : s === "products"
                      ? `Products (${seller.products.length})`
                      : "Active Orders"}
              </button>
            ))}
          </div>

          {activeSection === "pending" && (
            <p className="text-gray-500 text-center mt-2">No pending orders.</p>
          )}
          {activeSection === "orders" && (
            <p className="text-gray-500 text-center mt-2">No past orders.</p>
          )}
          {activeSection === "transactions" && (
            <p className="text-gray-500 text-center mt-2">
              No transactions yet.
            </p>
          )}

          {activeSection === "products" && (
            <div className="flex flex-col gap-4">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowAddCard(true)}
                  className="bg-purple-500 text-white rounded-full h-10 px-6 cursor-pointer font-bold"
                >
                  + Add Product
                </button>
              </div>

              {seller.products.length === 0 ? (
                <p className="text-gray-500 text-center">
                  No products listed yet.
                </p>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="py-3 pr-6 font-bold w-80">Product</th>
                      <th className="py-3 pr-6 font-bold">Price</th>
                      <th className="py-3 pr-6 font-bold">Stock</th>
                      <th className="py-3 pr-6 font-bold">Status</th>
                      <th className="py-3 font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seller.products.map((p) => (
                      <tr
                        key={p.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-all"
                      >
                        <td className="py-4 pr-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="h-20 w-20 object-cover object-center rounded shrink-0"
                            />
                            <div className="flex flex-col gap-0.5">
                              <p className="font-bold  ">{p.name}</p>
                              <p className="text-gray-400">
                                ID: {p.id.slice(0, 8)}...
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 pr-6  ">
                          ₦{Number(p.price).toLocaleString()}
                        </td>

                        <td className="py-4 pr-6  ">{p.stock ?? "—"}</td>

                        <td className="py-4 pr-6">
                          <span
                            className={`font-bold px-3.5 py-1.5 rounded-full ${p.published ? "bg-green-200 text-green-700" : "bg-gray-200 text-gray-500"}`}
                          >
                            {p.published ? "Published" : "Draft"}
                          </span>
                        </td>

                        <td className="py-4">
                          <div className="flex gap-3">
                            <button
                              onClick={() => setEditingProduct(p)}
                              className="border-2 rounded-full h-8 px-4 cursor-pointer  "
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => setDeletingProduct(p)}
                              className="border-2 border-red-500 text-red-500 rounded-full h-8 px-4 cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </section>
      </div>

      {showEditShop && (
        <EditShopCard
          seller={seller}
          onClose={() => setShowEditShop(false)}
          onSuccess={() => {
            setShowEditShop(false);
            fetchSeller();
          }}
        />
      )}

      {showAddCard && (
        <AddProductCard
          onClose={() => setShowAddCard(false)}
          onSuccess={() => {
            setShowAddCard(false);
            fetchSeller();
          }}
        />
      )}

      {editingProduct && (
        <EditProductCard
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSuccess={() => {
            setEditingProduct(null);
            fetchSeller();
          }}
        />
      )}

      {deletingProduct && (
        <DeleteProductCard
          product={deletingProduct}
          onClose={() => setDeletingProduct(null)}
          onSuccess={() => {
            setDeletingProduct(null);
            fetchSeller();
          }}
        />
      )}
    </main>
  );
};

export default SellerProfile;
