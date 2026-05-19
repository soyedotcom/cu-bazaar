import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type CartItem = {
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string | null;
  size?: string | null;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (p) =>
          p.productId === item.productId &&
          p.color === item.color &&
          p.size === item.size,
      );

      if (existing) {
        return prev.map((p) =>
          p === existing ? { ...p, quantity: p.quantity + 1 } : p,
        );
      }

      return [...prev, item];
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
