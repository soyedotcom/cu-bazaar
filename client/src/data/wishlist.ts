import type { Product } from "../types/product";

export interface WishlistItem {
  product: Product;
}

export interface Wishlist {
  wishlist: WishlistItem[];
}
