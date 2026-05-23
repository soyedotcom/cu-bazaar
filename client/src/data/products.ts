export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  features?: string[];
  measurements?: string;
  materialsandcare?: string;

  price: number;
  seller: {
    shopName: string;
  };

  variants?: {
    colors?: string[];
    sizes?: string[];
  };

  category: string;
  subcategory: string;
  section: string;
  tags?: string[];
}

export const products: Product[] = [
  {
    id: "a",
    name: "White Socks",
    image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82",
    description: "This product is for sale",
    price: 2500,
    seller: {
      shopName: "SBU",
    },

    category: "Products",
    subcategory: "Fashion",
    section: "Tops",
  },

  {
    id: "ab",
    name: "Adidas Sneakers",
    image: "https://images.unsplash.com/photo-1718220130188-428c7dc27fd2",
    description: "This product is for sale",
    price: 45000,
    seller: {
      shopName: "SBU",
    },

    category: "Products",
    subcategory: "Fashion",
    section: "Shoes",
  },

  {
    id: "abc",
    name: "Graphic Hoodie",
    image: "https://images.unsplash.com/photo-1680292783974-a9a336c10366",
    description: "This product is for sale",
    price: 18000,
    seller: {
      shopName: "SBU",
    },
    category: "Products",
    subcategory: "Fashion",
    section: "Tops",

    variants: {
      colors: ["Black", "White", "Red"],
      sizes: ["S", "M", "L", "XL"],
    },
  },
];
