import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/axios";

import type { Product } from "../types/product";

import EditProductCard from "../components/EditProductCard";
import AddProductCard from "../components/AddProductCard";
import DeleteProductCard from "../components/DeleteProductCard";
import EditShopCard from "../components/EditShopCard";
import WithdrawalCard from "../components/WithdrawalCard";

type WalletTransaction = {
  id: string;
  amount: number;
  type: string;
  description: string;
  createdAt: string;
};

type Withdrawal = {
  id: string;
  amount: number;
  status: string;
  bankName: string;
  accountNumber: string;
  createdAt: string;
};

type OrderItem = {
  id: number;
  quantity: number;
  price: number;
  status: string;
  paymentStatus: string;
  sellerConfirmed: boolean;
  selectedSize?: string;
  selectedColor?: string;
  product: { name: string; image: string };
  order: { id: string; user: { name: string; hall: string; room: string } };
};

type Seller = {
  shopName: string;
  description?: string;
  logo?: string;
  banner?: string;
  userId: string;
  products: Product[];
  orders: OrderItem[];
  availableBalance: number;
  pendingBalance: number;
  bank?: string;
  accountNumber?: string;
  accountName?: string;
  walletTransactions: WalletTransaction[];
  withdrawals: Withdrawal[];
  createdAt: string;
};

type ActiveSection =
  | "products"
  | "pending"
  | "orders"
  | "transactions"
  | "wallet"
  | null;

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
  const [showWithdrawCard, setShowWithdrawCard] = useState(false);

  const fetchSeller = useCallback(async () => {
    try {
      const res = await api.get("/seller/dashboard");
      setSeller(res.data.data.Seller);
    } catch {
      setError("Failed to load Seller Profile");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSeller();
  }, [fetchSeller]);

  const confirmDelivery = async (orderItemId: number) => {
    try {
      const res = await api.patch(`/orders/confirm/${orderItemId}`);
      console.log("confirm response: ", res.data);
      fetchSeller();
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const statusColor = (status: string) => {
    if (status === "DELIVERED" || status === "SUCCESS")
      return "bg-green-100 text-green-700";
    if (status === "CANCELLED" || status === "FAILED")
      return "bg-red-100 text-red-500";
    if (status === "PROCESSING") return "bg-blue-100 text-blue-600";
    return "bg-yellow-100 text-yellow-700";
  };

  const txColor = (type: string) => {
    if (type === "CREDIT_PENDING") return "text-yellow-600";
    if (type === "RELEASE_FUNDS") return "text-green-600";
    if (type === "WITHDRAWAL") return "text-red-500";
    if (type === "REFUND") return "text-blue-500";
    return "text-gray-500";
  };

  if (loading) return <p className="mx-25 my-10">Loading...</p>;
  if (error || !seller) return <p className="mx-25 my-10">{error}</p>;

  const pendingOrders = seller.orders.filter(
    (o) =>
      o.paymentStatus === "PAID" &&
      o.status !== "DELIVERED" &&
      o.status !== "CANCELLED",
  );

  const pastOrders = seller.orders.filter(
    (o) => o.status === "DELIVERED" || o.status === "CANCELLED",
  );

  return (
    <main className="flex flex-col mx-25 my-10">
      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <img
              src={seller.banner}
              alt={seller.shopName}
              className="w-full h-50 object-cover object-center rounded-xl"
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-5 items-center">
                <img
                  src={seller.logo}
                  alt={seller.shopName}
                  className="rounded-full h-20 w-20 object-cover object-center"
                />

                <h1 className="font-bold text-[45px]">{seller.shopName}</h1>
              </div>

              <button
                onClick={() => setShowEditShop(true)}
                className="border-2 rounded-full h-10 px-6 cursor-pointer"
              >
                Edit Shop
              </button>
            </div>
          </div>

          <div className="text-left flex flex-col gap-1">
            {seller.description && (
              <p className="text-gray-500">{seller.description}</p>
            )}
            <p className="text-gray-400">
              Shop opened:{" "}
              {new Date(seller.createdAt).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-gray-400">Welcome back, {user?.name}</p>
          </div>

          {/* balance cards */}
          <div className="flex gap-5">
            <div className="flex flex-col gap-1 bg-gray-50 rounded-xl p-5 flex-1 text-left">
              <p className="text-sm text-gray-400">Available Balance</p>
              <p className="font-bold text-2xl text-green-600">
                ₦{Number(seller.availableBalance).toLocaleString()}
              </p>
              <p className="text-xs text-gray-400 mb-3">Withdrawable</p>
              <button
                onClick={() => setShowWithdrawCard(true)}
                disabled={Number(seller.availableBalance) === 0}
                className="border-2 border-green-500 text-green-600 rounded-full h-9 px-5 cursor-pointer text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed w-fit"
              >
                Request Withdrawal
              </button>
            </div>

            <div className="flex flex-col gap-1 bg-gray-50 rounded-xl p-5 flex-1 text-left">
              <p className="text-sm text-gray-400">Pending Balance</p>
              <p className="font-bold text-2xl text-yellow-600">
                ₦{Number(seller.pendingBalance).toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">
                Awaiting delivery confirmation
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex gap-5 flex-wrap">
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
                {s === "products"
                  ? `Products (${seller.products.length})`
                  : s === "pending"
                    ? `Active Orders${pendingOrders.length > 0 ? ` (${pendingOrders.length})` : ""}`
                    : s === "orders"
                      ? "Order History"
                      : s === "transactions"
                        ? "Wallet Transactions"
                        : "Withdraw"}
              </button>
            ))}
          </div>

          {/* products table */}
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
                              <p className="font-bold">{p.name}</p>
                              <p className="text-gray-400">
                                ID: {p.id.slice(0, 8)}...
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 pr-6">
                          ₦{Number(p.price).toLocaleString()}
                        </td>
                        <td className="py-4 pr-6">{p.stock ?? "—"}</td>
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
                              className="border-2 rounded-full h-8 px-4 cursor-pointer"
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

          {/* active orders */}
          {activeSection === "pending" && (
            <div className="flex flex-col gap-4">
              {pendingOrders.length === 0 ? (
                <p className="text-gray-500 text-center">No active orders.</p>
              ) : (
                pendingOrders.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border rounded-xl p-4"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-16 w-16 object-cover rounded-lg"
                    />
                    <div className="flex flex-col gap-1 flex-1 text-left">
                      <p className="font-bold">{item.product.name}</p>
                      <p className="text-sm text-gray-400">
                        Order: {item.order.id.slice(0, 8)}... · Qty:{" "}
                        {item.quantity}
                        {item.selectedSize && ` · Size: ${item.selectedSize}`}
                        {item.selectedColor &&
                          ` · Color: ${item.selectedColor}`}
                      </p>
                      <p className="text-sm text-gray-400">
                        Buyer: {item.order.user.name} · {item.order.user.hall}{" "}
                        Room {item.order.user.room}
                      </p>
                      <p className="font-bold">
                        ₦{Number(item.price).toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor(item.status)}`}
                    >
                      {item.status}
                    </span>
                    {!item.sellerConfirmed && (
                      <button
                        onClick={() => confirmDelivery(item.id)}
                        className="border-2 border-green-500 text-green-600 rounded-full h-8 px-4 cursor-pointer text-sm font-bold"
                      >
                        Mark Delivered
                      </button>
                    )}
                    {item.sellerConfirmed && (
                      <span className="text-xs text-green-500 font-bold">
                        Awaiting buyer
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* order history */}
          {activeSection === "orders" && (
            <div className="flex flex-col gap-4">
              {pastOrders.length === 0 ? (
                <p className="text-gray-500 text-center">No past orders.</p>
              ) : (
                pastOrders.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border rounded-xl p-4"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-16 w-16 object-cover rounded-lg"
                    />
                    <div className="flex flex-col gap-1 flex-1 text-left">
                      <p className="font-bold">{item.product.name}</p>
                      <p>
                        {item.order.user.name} · {item.order.user.hall}{" "}
                        {item.order.user.room}
                      </p>
                      <p className="text-gray-400">
                        Qty: {item.quantity} · ₦
                        {Number(item.price).toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}

          {/* wallet transactions */}
          {activeSection === "transactions" && (
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <h3 className="font-bold text-[32px] text-left">
                  Wallet Transactions
                </h3>
                {seller.walletTransactions.length === 0 ? (
                  <p className="text-gray-500 text-center">
                    No transactions yet.
                  </p>
                ) : (
                  seller.walletTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex justify-between items-center border-b py-3"
                    >
                      <div className="text-left">
                        <p className="text-xs text-gray-400">
                          {new Date(tx.createdAt).toLocaleDateString("en-GB")}
                        </p>
                        <p className="font-bold">{tx.description}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${txColor(tx.type)}`}>
                          {tx.type === "WITHDRAWAL" ? "-" : "+"}₦
                          {Number(tx.amount).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400">
                          {tx.type.replace(/_/g, " ")}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-bold text-[32px] text-left">
                  Withdrawal History
                </h3>
                {seller.withdrawals.length === 0 ? (
                  <p className="text-gray-500 text-center">
                    No withdrawals yet.
                  </p>
                ) : (
                  seller.withdrawals.map((w) => (
                    <div
                      key={w.id}
                      className="flex justify-between items-center border-b py-3"
                    >
                      <div className="text-left">
                        <p className="text-xs text-gray-400">
                          {new Date(w.createdAt).toLocaleDateString("en-GB")}
                        </p>
                        <p className="text-xs text-gray-400">
                          {w.bankName} · {w.accountNumber}
                        </p>
                        <p className="font-bold">
                          ₦{Number(w.amount).toLocaleString()}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor(w.status)}`}
                      >
                        {w.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
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
      {showWithdrawCard && (
        <WithdrawalCard
          availableBalance={Number(seller.availableBalance)}
          onClose={() => setShowWithdrawCard(false)}
          onSuccess={() => {
            setShowWithdrawCard(false);
            fetchSeller();
          }}
        />
      )}
    </main>
  );
};

export default SellerProfile;
