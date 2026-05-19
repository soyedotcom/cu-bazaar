import { createContext, useContext } from "react";

export type CartItem = {
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string | null;
  size?: string | null;
};

export type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};