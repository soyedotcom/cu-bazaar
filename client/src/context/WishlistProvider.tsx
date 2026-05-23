import { useEffect, useState, type ReactNode } from "react";
import { api } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { WishlistContext, type WishlistItem } from "./WishlistContext";

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);

  const refreshWishlist = async () => {
    if (!user) return;

    setLoading(true);

    try {
      const res = await api.get("/wishlist");
      setWishlist(res.data.data.wishlistItems);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshWishlist();
  }, [user]);

  const addToWishlist = async (productId: string) => {
    await api.post("/wishlist", { productId });
    await refreshWishlist();
  };

  const removeFromWishlist = async (id: string) => {
    await api.delete(`/wishlist/${id}`);
    await refreshWishlist();
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        addToWishlist,
        removeFromWishlist,
        refreshWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
