import type { ReactNode } from "react";

import FashionIcon from "@mui/icons-material/CheckroomRounded";
import FoodIcon from "@mui/icons-material/FastfoodRounded";
import GadjetIcon from "@mui/icons-material/LaptopChromebookRounded";

export interface Section {
  name: string;
  icon?: ReactNode;
}

export interface SubCategory {
  name: string;
  icon?: ReactNode;
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
        icon: <FashionIcon />,

        sections: [
          { name: "Tops", icon: <FashionIcon /> },
          { name: "Bottoms", icon: <FashionIcon /> },
          { name: "Shoes", icon: <FashionIcon /> },
          { name: "Jewelry and Accessories", icon: <FashionIcon /> },
        ],
      },

      {
        name: "Food and Provisions",
        icon: <FoodIcon />,
        sections: [
          { name: "Snacks", icon: <FashionIcon /> },
          { name: "Drinks", icon: <FashionIcon /> },
        ],
      },

      {
        name: "Gadjets and Accessories",
        icon: <GadjetIcon />,
        sections: [
          { name: "Laptops", icon: <FashionIcon /> },
          { name: "Tablets", icon: <FashionIcon /> },
        ],
      },
    ],
  },

  {
    name: "Services",

    subcategories: [
      {
        name: "Laundry",
        icon: <FashionIcon />,
      },

      {
        name: "Hair Styling",
        icon: <FashionIcon />,
      },

      {
        name: "Repair and Maintainence",
        icon: <FashionIcon />,
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
