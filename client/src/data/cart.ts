import type { Product } from "./products";

export interface CartItem {
  product: Product;
  quantity: number;
}

export const cart: CartItem[] = [
  {
    product: {
      id: 13,
      name: "Bracelet Set",
      image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638",
      price: 15000,
      description: "This product is for sale",
      seller: "SBU",
      category: "Products",
      subcategory: "Fashion",
      section: "Jewelry and Accessories",
    },

    quantity: 1,
  },

  {
    product: {
      id: 14,
      name: "Stud Earrings",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
      price: 8000,
      description: "This product is for sale",
      seller: "SBU",
      category: "Products",
      subcategory: "Fashion",
      section: "Jewelry and Accessories",
    },
    quantity: 1,
  },
  {
    product: {
      id: 15,
      name: "Chips Pack",
      image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b",
      price: 1500,
      description: "This product is for sale",
      seller: "SBU",
      category: "Products",
      subcategory: "Food and Provisions",
      section: "Snacks",
    },
    quantity: 1,
  },
];
