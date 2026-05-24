import { useEffect, useState, useCallback, type ReactNode } from "react";
import { api } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { CartContext, type CartItem } from "./CartContext";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const refreshCart = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await api.get("/cart");
      setCart(res.data.data.cartItems);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const loadCart = async () => {
      setLoading(true);
      try {
        const res = await api.get("/cart");
        setCart(res.data.data.cartItems);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
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

  const updateCartItem = async (id: number, quantity: number) => {
    await api.patch(`/cart/${id}`, { quantity });
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
        updateCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
