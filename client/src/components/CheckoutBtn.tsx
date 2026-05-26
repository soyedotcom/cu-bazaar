import { useState } from "react";
import { useCart } from "../context/CartContext";
import { api } from "../api/axios";

const CheckoutBtn = () => {
  const { cart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/orders");
      window.location.href = res.data.data.checkoutUrl;
    } catch (err) {
      setError("Failed to initiate checkout");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleCheckout}
        disabled={loading || cart.length === 0}
        className="bg-purple-500 text-white font-bold rounded-full h-12 w-full cursor-pointer disabled:opacity-50"
      >
        {loading ? "Processing..." : "Checkout"}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default CheckoutBtn;
