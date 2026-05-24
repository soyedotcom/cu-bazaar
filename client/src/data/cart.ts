import type { Product } from "../types/product";

export interface CartItem {
  product: Product;
  quantity: number;
  color?: string;
  size?: string;
}
