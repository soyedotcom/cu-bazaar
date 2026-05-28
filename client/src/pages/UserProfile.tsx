import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { api } from "../api/axios";
import EditUserProfileCard from "../components/EditUserProfileCard";

type ActiveSection = "orders" | "transactions" | "active" | null;

type OrderItem = {
  id: number;
  productId: string;
  quantity: number;
  price: number;
  status: string;
  paymentStatus: string;
  selectedSize?: string;
  selectedColor?: string;
  buyerConfirmed: boolean;
  product: { name: string; image: string };
  seller: { shopName: string };
};

type Order = {
  id: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
};

const UserProfile = () => {
  const { user, signout } = useAuth();
  const [showCard, setShowCard] = useState(false);
  const [activeSection, setActiveSection] = useState<ActiveSection>("active");
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  if (!user) return null;

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const res = await api.get("/orders");
      setOrders(res.data.data.orders);
    } catch (err) {
      console.log(err);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const activeOrders = orders.filter(
    (o) =>
      o.paymentStatus === "PAID" &&
      o.status !== "DELIVERED" &&
      o.status !== "CANCELLED",
  );

  const pastOrders = orders.filter(
    (o) => o.status === "DELIVERED" || o.status === "CANCELLED",
  );

  const confirmDelivery = async (orderItemId: number) => {
    try {
      await api.patch(`/orders/confirm/${orderItemId}`);
      fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

  const statusColor = (status: string) => {
    if (status === "DELIVERED") return "bg-green-100 text-green-700";
    if (status === "CANCELLED") return "bg-red-100 text-red-500";
    if (status === "PENDING") return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-500";
  };

  const renderOrders = (list: Order[]) => {
    if (ordersLoading) return <p className="text-gray-500">Loading...</p>;
    if (list.length === 0)
      return <p className="text-gray-500">Nothing here yet.</p>;

    return (
      <div className="flex flex-col gap-6">
        {list.map((order) => (
          <div
            key={order.id}
            className="border rounded-xl p-4 flex flex-col gap-4"
          >
            <div className="flex justify-between items-center text-sm text-gray-400">
              <p>Order ID: {order.id.slice(0, 8)}...</p>
              <p>{new Date(order.createdAt).toLocaleDateString("en-GB")}</p>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor(order.status)}`}
              >
                {order.status}
              </span>
              <p className="font-bold text-black">
                ₦{Number(order.totalAmount).toLocaleString()}
              </p>
            </div>

            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-16 w-16 object-cover rounded-lg"
                />
                <div className="flex flex-col gap-1 flex-1 text-left">
                  <p className="font-bold">{item.product.name}</p>
                  <p className="text-sm text-gray-400">
                    {item.seller.shopName} · Qty: {item.quantity}
                    {item.selectedSize && ` · Size: ${item.selectedSize}`}
                    {item.selectedColor && ` · Color: ${item.selectedColor}`}
                  </p>
                  <p className="text-sm font-bold">
                    ₦{Number(item.price).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor(item.status)}`}
                >
                  {item.status}
                </span>

                {item.paymentStatus === "PAID" &&
                  item.status !== "DELIVERED" &&
                  item.status !== "CANCELLED" &&
                  !item.buyerConfirmed && (
                    <button
                      onClick={() => confirmDelivery(item.id)}
                      className="border-2 border-green-500 text-green-600 rounded-full h-8 px-4 cursor-pointer text-sm font-bold"
                    >
                      Confirm Received
                    </button>
                  )}

                {item.buyerConfirmed && item.status !== "DELIVERED" && (
                  <span className="text-xs text-green-500 font-bold">
                    Awaiting seller
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <main className="flex flex-col mx-25 my-10">
      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <div className="flex gap-5 items-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="rounded-full h-20 w-20 object-cover object-center"
              />
              <h1 className="font-bold text-[45px]">Hello, {user.name}</h1>
            </div>

            <div className="flex gap-5">
              <button
                className="border-2 rounded-full h-10 w-30 cursor-pointer"
                onClick={() => setShowCard(true)}
              >
                Edit Profile
              </button>

              <button
                className="bg-red-500 text-white rounded-full h-10 w-30 cursor-pointer"
                onClick={signout}
              >
                Sign Out
              </button>
            </div>
          </div>

          <div className="text-left flex flex-col gap-2">
            <p className="font-bold">
              {user.hall} {user.room}
            </p>
            <p>{user.email}</p>
            <p className="text-gray-500">
              Member since:{" "}
              {new Date(user.createdAt).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <p className="text-left">
            {user.isSeller ? (
              <Link
                to="/seller/dashboard"
                className="font-bold hover:text-purple-500 hover:underline"
              >
                Go To Shop Profile
              </Link>
            ) : (
              <>
                Own a business?{" "}
                <Link
                  to="/become-a-seller"
                  className="font-bold hover:text-purple-500 hover:underline"
                >
                  Start selling
                </Link>
              </>
            )}
          </p>

          <div className="flex gap-5">
            {(["active", "orders", "transactions"] as ActiveSection[]).map(
              (s) => (
                <button
                  key={s}
                  onClick={() =>
                    setActiveSection(activeSection === s ? null : s)
                  }
                  className={`border-2 rounded-full h-10 px-5 cursor-pointer transition-all ${activeSection === s ? "bg-black text-white" : ""}`}
                >
                  {s === "orders"
                    ? "Order History"
                    : s === "transactions"
                      ? "Transaction History"
                      : `Active Orders${activeOrders.length > 0 ? ` (${activeOrders.length})` : ""}`}
                </button>
              ),
            )}
          </div>

          <div className="mt-4">
            {activeSection === "active" && renderOrders(activeOrders)}
            {activeSection === "orders" && renderOrders(pastOrders)}
            {activeSection === "transactions" && (
              <p className="text-gray-500 text-center">No transactions yet.</p>
            )}
          </div>
        </section>
      </div>

      {showCard && <EditUserProfileCard onClose={() => setShowCard(false)} />}
    </main>
  );
};

export default UserProfile;
