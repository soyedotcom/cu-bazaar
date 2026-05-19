import { useState, type ReactNode } from "react";
import { WishlistContext, type WishlistItem } from "./WishlistContext";
import type { Product } from "../data/products";

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.product.id === product.id);
      if (exists) return prev;
      return [...prev, { product }];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist((prev) => prev.filter((item) => item.product.id !== productId));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
