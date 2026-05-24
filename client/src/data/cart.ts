import type { Product } from "./products";

export interface CartItem {
  product: Product;
  quantity: number;
  color?: string;
  size?: string;
}
