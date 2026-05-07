export interface SubCategory {
  name: string;
  icon?: string;
}

export interface Category {
  name: string;
  subcategories?: SubCategory[];
}

export const subNavData: Category[] = [
  {
    name: "Products",
    subcategories: [{ name: "Fashion" }, { name: "Food and Provisions" }],
  },
  {
    name: "Services",
    subcategories: [{ name: "Laundry" }, { name: "Hair Styling" }],
  },
  {
    name: "Deals and Discounts",
  },
  {
    name: "News and Events",
  },
];
