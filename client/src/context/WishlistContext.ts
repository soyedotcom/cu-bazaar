import { createContext, useContext } from "react";

export type WishlistItem = {
  id: string;
  productId: string;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
};

export type WishlistContextType = {
  wishlist: WishlistItem[];
  loading: boolean;

  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (id: string) => Promise<void>;
  refreshWishlist: () => Promise<void>;
};

export const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export const useWishlist = () => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }

  return context;
};
