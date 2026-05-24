import type { Product } from "./products";

export interface WishlistItem {
  product: Product;
}

export interface Wishlist {
  wishlist: WishlistItem[];
}