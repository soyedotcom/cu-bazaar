import { createContext, useContext } from "react";
import type { Product } from "../data/products";

export type WishlistItem = {
  product: Product;
};

export type WishlistContextType = {
  wishlist: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
};

export const WishlistContext =
  createContext<WishlistContextType | null>(null);

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }

  return context;
};