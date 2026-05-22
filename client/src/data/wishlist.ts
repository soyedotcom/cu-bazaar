import type { Product } from "./products";

export interface WishlistItem {
  product: Product;
}

export interface Wishlist {
  wishlist: WishlistItem[];
}

export const wishlist: WishlistItem[] = [
  {
    product: {
      id: 16,
      name: "Chocolate Bar",
      image: "https://images.unsplash.com/photo-1548907040-4baa42d10919",
      price: 1200,
      description: "This product is for sale",

      seller: "SBU",
      category: "Products",
      subcategory: "Food and Provisions",
      section: "Snacks",
    },
  },
  {
    product: {
      id: 17,
      name: "Cookies Pack",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35",
      price: 2000,
      description: "This product is for sale",

      seller: "SBU",
      category: "Products",
      subcategory: "Food and Provisions",
      section: "Snacks",
    },
  },
  {
    product: {
      id: 18,
      name: "Soft Drink",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87",
      price: 800,
      description: "This product is for sale",

      seller: "SBU",
      category: "Products",
      subcategory: "Food and Provisions",
      section: "Drinks",
    },
  },
  {
    product: {
      id: 19,
      name: "Fruit Juice",
      image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba",
      price: 2500,
      description: "This product is for sale",

      seller: "SBU",
      category: "Products",
      subcategory: "Food and Provisions",
      section: "Drinks",
    },
  },
  {
    product: {
      id: 20,
      name: "Bottled Water",
      image: "https://images.unsplash.com/photo-1523362628745-0c100150b504",
      price: 500,
      description: "This product is for sale",
      seller: "SBU",
      category: "Products",
      subcategory: "Food and Provisions",
      section: "Drinks",
    },
  },
];
