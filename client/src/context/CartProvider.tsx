import { useEffect, useState, type ReactNode } from "react";
import { api } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { CartContext, type CartItem } from "./CartContext";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const refreshCart = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const res = await api.get("/cart");
      setCart(res.data.data.cartItems);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) refreshCart();
  }, [user]);
  

  const addToCart = async (data: {
    productId: string;
    quantity?: number;
    selectedColor?: string | null;
    selectedSize?: string | null;
  }) => {
    await api.post("/cart", data);
    await refreshCart();
  };

  const removeFromCart = async (id: number) => {
    await api.delete(`/cart/${id}`);
    await refreshCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
