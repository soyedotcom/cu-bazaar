export interface Section {
  name: string;
}

export interface SubCategory {
  name: string;
  icon?: string;
  sections?: Section[];
}

export interface Category {
  name: string;
  subcategories?: SubCategory[];
}

export const subNavData: Category[] = [
  {
    name: "Products",

    subcategories: [
      {
        name: "Fashion",

        sections: [
          { name: "Tops" },
          { name: "Bottoms" },
          { name: "Shoes" },
          { name: "Jewelry and Accessories" },
        ],
      },

      {
        name: "Food and Provisions",

        sections: [{ name: "Snacks" }, { name: "Drinks" }],
      },
    ],
  },

  {
    name: "Services",

    subcategories: [
      {
        name: "Laundry",
      },

      {
        name: "Hair Styling",
      },
    ],
  },

  {
    name: "Deals and Discounts",
  },

  {
    name: "News and Events",
  },
];
