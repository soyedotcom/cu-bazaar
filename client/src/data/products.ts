export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;

  category: string;
  subcategory: string;
  section: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "White Socks",
    image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82",

    price: 2500,

    category: "Products",
    subcategory: "Fashion",
    section: "Tops",
  },

  {
    id: 2,
    name: "Adidas Sneakers",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",

    price: 45000,

    category: "Products",
    subcategory: "Fashion",
    section: "Shoes",
  },
];
