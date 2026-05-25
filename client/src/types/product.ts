export type Product = {
  id: string;
  name: string;
  image: string;
  images?: string[];
  description: string;
  stock: number;
  published: boolean;
  features?: string[];
  measurements?: string;
  materialsAndCare?: string;

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
};
