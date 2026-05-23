import { createContext, useContext } from "react";

export type CartItem = {
  id: number;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
};

export type CartContextType = {
  cart: CartItem[];
  loading: boolean;

  addToCart: (data: {
    productId: string;
    quantity?: number;
    selectedColor?: string | null;
    selectedSize?: string | null;
  }) => Promise<void>;

  removeFromCart: (id: number) => Promise<void>;
  refreshCart: () => Promise<void>;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
};
