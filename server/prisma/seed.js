import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/**
 * -----------------------------
 * USERS (4 SELLERS + 2 BUYERS)
 * -----------------------------
 */

const users = [
  {
    name: "Daniel Okon",
    email: "daniel@cubazzar.com",
    hall: "Daniel",
    room: "A405",
    role: "SELLER",
    isSeller: true,
    shopName: "Urban Threads",
  },
  {
    name: "Sarah Johnson",
    email: "sarah@cubazzar.com",
    hall: "Mary",
    room: "B302",
    role: "SELLER",
    isSeller: true,
    shopName: "Snack Haven",
  },
  {
    name: "Michael Peters",
    email: "michael@cubazzar.com",
    hall: "Joshua",
    room: "C215",
    role: "SELLER",
    isSeller: true,
    shopName: "Tech Spot",
  },
  {
    name: "Grace Etim",
    email: "grace@cubazzar.com",
    hall: "Esther",
    room: "D120",
    role: "SELLER",
    isSeller: true,
    shopName: "Campus Services Hub",
  },

  {
    name: "James Wilson",
    email: "james@cubazzar.com",
    hall: "Dorcas",
    room: "G250",
    role: "USER",
    isSeller: false,
  },
  {
    name: "Sophia Brown",
    email: "sophia@cubazzar.com",
    hall: "Lydia",
    room: "H110",
    role: "USER",
    isSeller: false,
  },
];

/**
 * -----------------------------
 * REALISTIC PRODUCT DATA
 * -----------------------------
 */

const productCatalog = [
  // ---------------- FASHION ----------------
  {
    sellerEmail: "daniel@cubazzar.com",
    products: [
      {
        name: "Oversized Streetwear Hoodie",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        description: "Premium oversized hoodie for everyday campus drip.",
        price: 15000,
        category: "Products",
        subcategory: "Fashion",
        section: "Tops",
        tags: ["hoodie", "streetwear"],
        features: ["Cotton", "Unisex"],
        variants: { sizes: ["S", "M", "L"], colors: ["Black", "Grey"] },
      },
      {
        name: "Cargo Pants",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1",
        description: "Relaxed fit cargo pants with deep pockets.",
        price: 12000,
        category: "Products",
        subcategory: "Fashion",
        section: "Bottoms",
        tags: ["cargo", "pants"],
      },
      {
        name: "White Sneakers",
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
        description: "Clean white sneakers for everyday wear.",
        price: 18000,
        category: "Products",
        subcategory: "Fashion",
        section: "Shoes",
      },
      {
        name: "Minimal Chain Necklace",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
        description: "Simple gold chain accessory.",
        price: 5000,
        category: "Products",
        subcategory: "Fashion",
        section: "Jewelry and Accessories",
      },
      {
        name: "Graphic T-Shirt",
        image: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47",
        description: "Cotton graphic tee for casual styling.",
        price: 7000,
        category: "Products",
        subcategory: "Fashion",
        section: "Tops",
      },
    ],
  },

  // ---------------- FOOD ----------------
  {
    sellerEmail: "sarah@cubazzar.com",
    products: [
      {
        name: "Chocolate Chip Cookies",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
        description: "Fresh homemade cookies.",
        price: 2500,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Snacks",
      },
      {
        name: "Spicy Puff Puff Pack",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
        description: "Soft Nigerian puff puff snack.",
        price: 1500,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Snacks",
      },
      {
        name: "Fresh Fruit Juice",
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba",
        description: "Cold blended fruit juice.",
        price: 2000,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Drinks",
      },
      {
        name: "Energy Drink Can",
        image: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e",
        description: "Boost energy during study sessions.",
        price: 1200,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Drinks",
      },
      {
        name: "Cupcake Box (6pcs)",
        image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d",
        description: "Soft vanilla cupcakes.",
        price: 3000,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Snacks",
      },
    ],
  },

  // ---------------- TECH ----------------
  {
    sellerEmail: "michael@cubazzar.com",
    products: [
      {
        name: "HP Pavilion Laptop",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
        description: "Reliable student laptop.",
        price: 350000,
        category: "Products",
        subcategory: "Gadjets and Accessories",
        section: "Laptops",
      },
      {
        name: "Wireless Gaming Mouse",
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db",
        description: "Smooth wireless control.",
        price: 15000,
        category: "Products",
        subcategory: "Gadjets and Accessories",
        section: "Peripherals",
      },
      {
        name: "Mechanical Keyboard",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
        description: "RGB mechanical keyboard.",
        price: 25000,
        category: "Products",
        subcategory: "Gadjets and Accessories",
        section: "Peripherals",
      },
      {
        name: "External SSD 1TB",
        image: "https://images.unsplash.com/photo-1612810806695-30f7a8258391",
        description: "Fast portable storage.",
        price: 45000,
        category: "Products",
        subcategory: "Gadjets and Accessories",
        section: "Storage Devices",
      },
      {
        name: "USB-C Hub",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
        description: "Multi-port USB-C expansion.",
        price: 8000,
        category: "Products",
        subcategory: "Gadjets and Accessories",
        section: "Peripherals",
      },
    ],
  },

  // ---------------- SERVICES ----------------
  {
    sellerEmail: "grace@cubazzar.com",
    products: [
      {
        name: "Laundry Wash & Fold",
        image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c",
        description: "Full laundry service for students.",
        price: 2000,
        category: "Services",
        subcategory: "Laundry",
        section: "Laundry Service",
      },
      {
        name: "Express Haircut",
        image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1",
        description: "Clean fade and styling.",
        price: 1500,
        category: "Services",
        subcategory: "Hair Styling",
        section: "Haircuts",
      },
      {
        name: "Braiding Service",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e",
        description: "Professional hair braiding.",
        price: 5000,
        category: "Services",
        subcategory: "Hair Styling",
        section: "Braiding",
      },
      {
        name: "Phone Repair Service",
        image: "https://images.unsplash.com/photo-1580910051074-3eb694886505",
        description: "Quick phone repairs.",
        price: 7000,
        category: "Services",
        subcategory: "Repair and Maintenance",
        section: "Phone Repair",
      },
      {
        name: "Laptop Repair Service",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        description: "Hardware and software fixes.",
        price: 12000,
        category: "Services",
        subcategory: "Repair and Maintenance",
        section: "Laptop Repair",
      },
    ],
  },
];

/**
 * -----------------------------
 * MAIN SEED FUNCTION
 * -----------------------------
 */

async function main() {
  console.log("🌱 Seeding CU Bazzar...");

  const hashedPassword = await bcrypt.hash("password", 10);

  // CLEAN DB
  await prisma.walletTransaction.deleteMany();
  await prisma.withdrawal.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.sellerProfile.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.user.deleteMany();

  // CREATE USERS
  for (const u of users) {
    await prisma.user.create({
      data: {
        name: u.name,
        email: u.email,
        hall: u.hall,
        room: u.room,
        password: hashedPassword,
        role: u.role,
        isSeller: u.isSeller,

        sellerProfile: u.isSeller
          ? {
              create: {
                shopName: u.shopName,
                description: `${u.shopName} on CU Bazzar`,
                availableBalance: new Prisma.Decimal(0),
                pendingBalance: new Prisma.Decimal(0),
              },
            }
          : undefined,
      },
    });
  }

  console.log("👤 Users created");

  // CREATE PRODUCTS
  for (const sellerBlock of productCatalog) {
    const seller = await prisma.user.findUnique({
      where: { email: sellerBlock.sellerEmail },
      include: { sellerProfile: true },
    });

    if (!seller?.sellerProfile) continue;

    for (const p of sellerBlock.products) {
      await prisma.product.create({
        data: {
          name: p.name,
          image: p.image,
          images: [],
          description: p.description,
          price: new Prisma.Decimal(p.price),
          stock: 20,
          published: true,

          category: p.category,
          subcategory: p.subcategory,
          section: p.section,

          features: p.features ?? [],
          tags: p.tags ?? [],

          variants: p.variants ?? null,

          seller: {
            connect: {
              userId: seller.sellerProfile.userId,
            },
          },
        },
      });
    }
  }

  console.log("📦 Products created");
  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
