import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import Decimal from "decimal.js";

const prisma = new PrismaClient();

const users = [
  // SELLERS
  {
    name: "test Daniel Okon",
    email: "testdaniel@cubazzar.com",
    hall: "Daniel",
    room: "A405",

    role: "SELLER",
    isSeller: true,

    sellerProfile: {
      shopName: "Urban Threads",
      description: "Affordable campus fashion.",
      logo: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    },
  },

  {
    name: "test Sarah Johnson",
    email: "testsarah@cubazzar.com",
    hall: "Mary",
    room: "B302",

    role: "SELLER",
    isSeller: true,

    sellerProfile: {
      shopName: "Snack Haven",
      description: "Snacks and drinks.",
      logo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    },
  },

  {
    name: "test Michael Peters",
    email: "testmichael@cubazzar.com",
    hall: "Joshua",
    room: "C215",

    role: "SELLER",
    isSeller: true,

    sellerProfile: {
      shopName: "Tech Spot",
      description: "Gadgets and accessories.",
      logo: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    },
  },

  {
    name: "test Grace Etim",
    email: "testgrace@cubazzar.com",
    hall: "Esther",
    room: "D120",

    role: "SELLER",
    isSeller: true,

    sellerProfile: {
      shopName: "Clean Wave Laundry",
      description: "Laundry services.",
      logo: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c",
    },
  },

  {
    name: "test Chris Adams",
    email: "testchris@cubazzar.com",
    hall: "Peter",
    room: "E240",

    role: "SELLER",
    isSeller: true,

    sellerProfile: {
      shopName: "Glow Hair Studio",
      description: "Hair styling services.",
      logo: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e",
    },
  },

  {
    name: "test Esther Bassey",
    email: "testesther@cubazzar.com",
    hall: "Paul",
    room: "F180",

    role: "SELLER",
    isSeller: true,

    sellerProfile: {
      shopName: "Fix Hub",
      description: "Laptop and phone repairs.",
      logo: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    },
  },

  // REGULAR USERS
  {
    name: "test James Wilson",
    email: "testjames@example.com",
    hall: "Dorcas",
    room: "G250",

    role: "USER",
    isSeller: false,
  },

  {
    name: "test Sophia Brown",
    email: "testsophia@example.com",
    hall: "Lydia",
    room: "H110",

    role: "USER",
    isSeller: false,
  },

  {
    name: "test David King",
    email: "testdavid@example.com",
    hall: "John",
    room: "A320",

    role: "USER",
    isSeller: false,
  },

  {
    name: "test Olivia Green",
    email: "testolivia@example.com",
    hall: "Deborah",
    room: "C140",

    role: "USER",
    isSeller: false,
  },
];

const products = [
  {
    sellerEmail: "testdaniel@cubazzar.com",

    name: "Oversized Black Hoodie",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",

    description: "Comfortable oversized hoodie.",
    price: 15000,
    rating: 5,

    category: "Products",
    subcategory: "Fashion",
    section: "Tops",

    measurements: "Medium fit",
    materialsAndCare: "100% cotton",

    features: ["Cotton", "Unisex", "Soft"],
    tags: ["hoodie", "fashion"],

    variants: {
      sizes: ["S", "M", "L"],
      colors: ["Black", "Grey"],
    },
  },

  {
    sellerEmail: "testsarah@cubazzar.com",

    name: "Chocolate Cookies",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",

    description: "Crunchy homemade cookies.",
    price: 2500,
    rating: 4,

    category: "Products",
    subcategory: "Food and Provisions",
    section: "Snacks",

    features: ["Fresh", "Chocolate"],
    tags: ["cookies", "snacks"],

    variants: null,
  },

  {
    sellerEmail: "testmichael@cubazzar.com",

    name: "HP Pavilion Laptop",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",

    description: "Reliable laptop for school.",
    price: 350000,
    rating: 5,

    category: "Products",
    subcategory: "Gadjets and Accessories",
    section: "Laptops",

    features: ["16GB RAM", "512GB SSD"],
    tags: ["laptop", "tech"],

    variants: null,
  },
];

const main = async () => {
  console.log("Seeding in progress...");

  const hashedPassword = await bcrypt.hash("password", 10);

  await prisma.cartItem.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.sellerProfile.deleteMany();
  await prisma.user.deleteMany();

  // CREATE USERS
  for (const userData of users) {
    await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        hall: userData.hall,
        room: userData.room,
        password: hashedPassword,

        role: userData.role,
        isSeller: userData.isSeller,

        sellerProfile: userData.isSeller
          ? {
              create: {
                shopName: userData.sellerProfile.shopName,
                description: userData.sellerProfile.description,
                logo: userData.sellerProfile.logo,
              },
            }
          : undefined,
      },
    });
  }

  // CREATE PRODUCTS
  for (const productData of products) {
    const seller = await prisma.user.findUnique({
      where: {
        email: productData.sellerEmail,
      },

      include: {
        sellerProfile: true,
      },
    });

    if (!seller?.sellerProfile) continue;

    await prisma.product.create({
      data: {
        name: productData.name,
        image: productData.image,
        description: productData.description,

        price: new Prisma.Decimal(productData.price),
        rating: productData.rating ?? null,

        measurements: productData.measurements,
        materialsAndCare: productData.materialsAndCare,

        category: productData.category,
        subcategory: productData.subcategory,
        section: productData.section,

        features: productData.features,
        tags: productData.tags,

        variants: productData.variants,

        seller: {
          connect: {
            userId: seller.sellerProfile.userId,
          },
        },
      },
    });
  }

  console.log("Seeding complete");
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
