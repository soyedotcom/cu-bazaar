import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

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
  // Primary test buyer
  {
    name: "Test User",
    email: "test@cubazzar.com",
    hall: "Daniel",
    room: "G009",
    role: "USER",
    isSeller: false,
  },
  // Secondary test buyer (also a seller)
  {
    name: "Kosi Eze",
    email: "kosi@cubazzar.com",
    hall: "Lydia",
    room: "C301",
    role: "SELLER",
    isSeller: true,
    shopName: "Kosi's Corner",
  },
];

const productCatalog = [
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

      // ------------------ NEW (DANIEL) ------------------
      {
        name: "Vintage Denim Jacket",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
        description: "Classic oversized denim jacket for street style.",
        price: 16000,
        category: "Products",
        subcategory: "Fashion",
        section: "Tops",
        tags: ["jacket", "denim"],
      },
      {
        name: "Slim Fit Black Jeans",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
        description: "Modern slim-fit black jeans.",
        price: 11000,
        category: "Products",
        subcategory: "Fashion",
        section: "Bottoms",
        tags: ["jeans"],
      },
      {
        name: "Chunky Sneakers",
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
        description: "Trendy chunky sneakers for bold outfits.",
        price: 20000,
        category: "Products",
        subcategory: "Fashion",
        section: "Shoes",
      },
      {
        name: "Baseball Cap",
        image: "https://images.unsplash.com/photo-1521369909029-2afed882baee",
        description: "Minimal streetwear cap.",
        price: 4000,
        category: "Products",
        subcategory: "Fashion",
        section: "Jewelry and Accessories",
      },
      {
        name: "Oversized Flannel Shirt",
        image: "https://images.unsplash.com/photo-1520975958225-4d2d8a7f7c0c",
        description: "Soft flannel shirt for layering.",
        price: 9000,
        category: "Products",
        subcategory: "Fashion",
        section: "Tops",
      },
      {
        name: "Graphic Hoodie Zip-Up",
        image: "https://images.unsplash.com/photo-1556821840-3a9fbc86d9d4",
        description: "Zip-up hoodie with bold street graphics.",
        price: 17000,
        category: "Products",
        subcategory: "Fashion",
        section: "Tops",
      },
      {
        name: "Distressed Skinny Jeans",
        image: "https://images.unsplash.com/photo-1475178626620-a4d074967452",
        description: "Ripped skinny jeans for edgy style.",
        price: 13000,
        category: "Products",
        subcategory: "Fashion",
        section: "Bottoms",
      },
      {
        name: "Leather Belt",
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80",
        description: "Premium leather belt for outfits.",
        price: 3500,
        category: "Products",
        subcategory: "Fashion",
        section: "Jewelry and Accessories",
      },
      {
        name: "High Top Sneakers",
        image: "https://images.unsplash.com/photo-1528701800489-20be3c8f9b7c",
        description: "Classic high-top street sneakers.",
        price: 19000,
        category: "Products",
        subcategory: "Fashion",
        section: "Shoes",
      },
    ],
  },

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

      // ------------------ NEW (SARAH) ------------------
      {
        name: "Meat Pie Pack",
        image: "https://images.unsplash.com/photo-1601050690117-3d5c7c3e1f3b",
        description: "Fresh baked meat pies.",
        price: 3000,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Snacks",
      },
      {
        name: "Chocolate Brownies",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
        description: "Rich fudgy brownies.",
        price: 2800,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Snacks",
      },
      {
        name: "Strawberry Smoothie",
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b",
        description: "Cold creamy strawberry smoothie.",
        price: 2500,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Drinks",
      },
      {
        name: "Yoghurt Parfait Cup",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777",
        description: "Layered yoghurt with fruits.",
        price: 2200,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Snacks",
      },
      {
        name: "Chicken Sandwich",
        image: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f",
        description: "Fresh grilled chicken sandwich.",
        price: 3500,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Snacks",
      },
      {
        name: "Iced Coffee Cup",
        image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5",
        description: "Chilled iced coffee for mornings.",
        price: 1800,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Drinks",
      },
      {
        name: "Banana Muffins",
        image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec",
        description: "Soft homemade banana muffins.",
        price: 2700,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Snacks",
      },
      {
        name: "Popcorn Bucket",
        image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087",
        description: "Buttery popcorn snack.",
        price: 1500,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Snacks",
      },
      {
        name: "Mango Juice Bottle",
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba",
        description: "Fresh mango juice.",
        price: 2000,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Drinks",
      },
      {
        name: "Donut Box (6pcs)",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
        description: "Soft glazed donuts.",
        price: 3200,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Snacks",
      },
    ],
  },

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

      // ------------------ NEW (MICHAEL) ------------------
      {
        name: "Wireless Earbuds",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
        description: "High quality sound earbuds.",
        price: 12000,
        category: "Products",
        subcategory: "Gadgets and Accessories",
        section: "Peripherals",
      },
      {
        name: "Laptop Cooling Pad",
        image: "https://images.unsplash.com/photo-1587202372775-98927d2c87c3",
        description: "Cooling pad for laptops.",
        price: 9000,
        category: "Products",
        subcategory: "Gadgets and Accessories",
        section: "Peripherals",
      },
      {
        name: "1TB Flash Drive",
        image: "https://images.unsplash.com/photo-1612810806695-30f7a8258391",
        description: "Portable USB storage.",
        price: 7000,
        category: "Products",
        subcategory: "Gadgets and Accessories",
        section: "Storage Devices",
      },
      {
        name: "HDMI Cable",
        image: "https://images.unsplash.com/photo-1612810806695-30f7a8258391",
        description: "High speed HDMI cable.",
        price: 3000,
        category: "Products",
        subcategory: "Gadgets and Accessories",
        section: "Peripherals",
      },
      {
        name: "Wireless Router",
        image: "https://images.unsplash.com/photo-1545259742-2ea3ebf61fa4",
        description: "Fast WiFi router.",
        price: 22000,
        category: "Products",
        subcategory: "Gadgets and Accessories",
        section: "Peripherals",
      },
      {
        name: "Laptop Stand",
        image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04",
        description: "Ergonomic laptop stand.",
        price: 6000,
        category: "Products",
        subcategory: "Gadgets and Accessories",
        section: "Peripherals",
      },
      {
        name: "USB Extension Cable",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
        description: "Extended USB connectivity.",
        price: 2500,
        category: "Products",
        subcategory: "Gadgets and Accessories",
        section: "Peripherals",
      },
      {
        name: "External Hard Drive 2TB",
        image: "https://images.unsplash.com/photo-1612810806695-30f7a8258391",
        description: "Large storage drive.",
        price: 55000,
        category: "Products",
        subcategory: "Gadgets and Accessories",
        section: "Storage Devices",
      },
      {
        name: "Power Bank 20,000mAh",
        image: "https://images.unsplash.com/photo-1609592806596-4d7d8b5b4f2a",
        description: "High capacity power bank.",
        price: 18000,
        category: "Products",
        subcategory: "Gadgets and Accessories",
        section: "Peripherals",
      },
      {
        name: "Bluetooth Adapter",
        image: "https://images.unsplash.com/photo-1587202372775-98927d2c87c3",
        description: "Wireless connectivity adapter.",
        price: 4000,
        category: "Products",
        subcategory: "Gadgets and Accessories",
        section: "Peripherals",
      },
    ],
  },

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

      // ------------------ NEW (GRACE) ------------------
      {
        name: "Deep Laundry Wash",
        image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c",
        description: "Intensive wash for heavy clothes.",
        price: 3000,
        category: "Services",
        subcategory: "Laundry",
        section: "Laundry Service",
      },
      {
        name: "Ironing Service",
        image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c",
        description: "Professional ironing and folding.",
        price: 1500,
        category: "Services",
        subcategory: "Laundry",
        section: "Laundry Service",
      },
      {
        name: "Dreadlock Maintenance",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e",
        description: "Maintenance for dreadlocks.",
        price: 6000,
        category: "Services",
        subcategory: "Hair Styling",
        section: "Braiding",
      },
      {
        name: "Manicure Service",
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371",
        description: "Clean nail grooming.",
        price: 3500,
        category: "Services",
        subcategory: "Hair Styling",
        section: "Haircuts",
      },
      {
        name: "Pedicure Service",
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371",
        description: "Foot nail care service.",
        price: 3500,
        category: "Services",
        subcategory: "Hair Styling",
        section: "Haircuts",
      },
      {
        name: "Screen Replacement",
        image: "https://images.unsplash.com/photo-1580910051074-3eb694886505",
        description: "Phone screen repair.",
        price: 9000,
        category: "Services",
        subcategory: "Repair and Maintenance",
        section: "Phone Repair",
      },
      {
        name: "OS Installation",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        description: "Operating system installation.",
        price: 8000,
        category: "Services",
        subcategory: "Repair and Maintenance",
        section: "Laptop Repair",
      },
      {
        name: "Virus Removal Service",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        description: "Clean malware and viruses.",
        price: 7000,
        category: "Services",
        subcategory: "Repair and Maintenance",
        section: "Laptop Repair",
      },
      {
        name: "Home Laundry Pickup",
        image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c",
        description: "Laundry pickup from hostel.",
        price: 2500,
        category: "Services",
        subcategory: "Laundry",
        section: "Laundry Service",
      },
      {
        name: "Quick Fade Retouch",
        image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1",
        description: "Fast haircut touch-up.",
        price: 1200,
        category: "Services",
        subcategory: "Hair Styling",
        section: "Haircuts",
      },
    ],
  },

  {
    sellerEmail: "kosi@cubazzar.com",
    products: [
      {
        name: "Jollof Rice Plate",
        image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26",
        description: "Hot party jollof rice, served fresh.",
        price: 1800,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Meals",
      },
      {
        name: "Fried Plantain (Dodo)",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
        description: "Freshly fried sweet plantain.",
        price: 800,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Snacks",
      },
      {
        name: "Chin Chin Pack",
        image: "https://images.unsplash.com/photo-1627485937980-221c88ac04f9",
        description: "Crunchy homemade chin chin.",
        price: 1000,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Snacks",
      },

      // ------------------ NEW (KOSI) ------------------
      {
        name: "Chicken Jollof Combo",
        image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26",
        description: "Jollof rice with grilled chicken.",
        price: 2500,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Meals",
      },
      {
        name: "Fried Rice Special",
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc500f",
        description: "Special fried rice with veggies.",
        price: 2200,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Meals",
      },
      {
        name: "Beef Stew Plate",
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc500f",
        description: "Rice served with rich beef stew.",
        price: 2000,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Meals",
      },
      {
        name: "Chicken Wings Pack",
        image: "https://images.unsplash.com/photo-1606756790138-261d2b21cd75",
        description: "Spicy grilled chicken wings.",
        price: 2300,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Snacks",
      },
      {
        name: "Suya Skewers",
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc500f",
        description: "Spicy Nigerian suya.",
        price: 1500,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Snacks",
      },
      {
        name: "Chapman Drink",
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87",
        description: "Refreshing Nigerian Chapman drink.",
        price: 1800,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Drinks",
      },
      {
        name: "Zobo Drink Bottle",
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba",
        description: "Chilled hibiscus drink.",
        price: 1200,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Drinks",
      },
      {
        name: "Fruit Salad Cup",
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87",
        description: "Fresh mixed fruit salad.",
        price: 1500,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Snacks",
      },
      {
        name: "Peppered Snail",
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc500f",
        description: "Spicy Nigerian delicacy.",
        price: 3000,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Snacks",
      },
      {
        name: "Mini Party Rice Tray",
        image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26",
        description: "Small party jollof tray.",
        price: 3500,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Meals",
      },
    ],
  },
];

async function main() {
  console.log("🌱 Seeding CU Bazzar...");

  const hashedPassword = await bcrypt.hash("password", 10);

  // CLEAN DB
  await prisma.walletTransaction.deleteMany();
  await prisma.withdrawal.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.sellerProfile.deleteMany();
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
          seller: { connect: { userId: seller.sellerProfile.userId } },
        },
      });
    }
  }

  console.log("📦 Products created");

  // -------------------------------------------------------
  // FETCH references needed for orders
  // -------------------------------------------------------
  const testUser = await prisma.user.findUnique({
    where: { email: "test@cubazzar.com" },
  });
  const kosi = await prisma.user.findUnique({
    where: { email: "kosi@cubazzar.com" },
    include: { sellerProfile: true },
  });
  const daniel = await prisma.user.findUnique({
    where: { email: "daniel@cubazzar.com" },
    include: { sellerProfile: true },
  });
  const sarah = await prisma.user.findUnique({
    where: { email: "sarah@cubazzar.com" },
    include: { sellerProfile: true },
  });
  const michael = await prisma.user.findUnique({
    where: { email: "michael@cubazzar.com" },
    include: { sellerProfile: true },
  });

  const hoodie = await prisma.product.findFirst({
    where: { name: "Oversized Streetwear Hoodie" },
  });
  const cargoPants = await prisma.product.findFirst({
    where: { name: "Cargo Pants" },
  });
  const cookies = await prisma.product.findFirst({
    where: { name: "Chocolate Chip Cookies" },
  });
  const juice = await prisma.product.findFirst({
    where: { name: "Fresh Fruit Juice" },
  });
  const keyboard = await prisma.product.findFirst({
    where: { name: "Mechanical Keyboard" },
  });
  const ssd = await prisma.product.findFirst({
    where: { name: "External SSD 1TB" },
  });
  const jollof = await prisma.product.findFirst({
    where: { name: "Jollof Rice Plate" },
  });
  const chinChin = await prisma.product.findFirst({
    where: { name: "Chin Chin Pack" },
  });

  // -------------------------------------------------------
  // ORDERS — Test User as buyer
  // -------------------------------------------------------

  // ORDER 1: Fully DELIVERED — both parties confirmed
  // Tests: order history, delivered status, released funds
  const order1 = await prisma.order.create({
    data: {
      userId: testUser.id,
      totalAmount: new Prisma.Decimal(27000),
      status: "DELIVERED",
      paymentStatus: "PAID",
      paymentReference: "CUB-test001-seed",
      paidAt: new Date("2026-05-01T10:00:00Z"),
    },
  });
  await prisma.orderItem.create({
    data: {
      orderId: order1.id,
      productId: hoodie.id,
      sellerId: daniel.sellerProfile.userId,
      quantity: 1,
      price: new Prisma.Decimal(15000),
      sellerAmount: new Prisma.Decimal(14250),
      platformFee: new Prisma.Decimal(750),
      paymentStatus: "PAID",
      status: "DELIVERED",
      buyerConfirmed: true,
      sellerConfirmed: true,
      deliveredAt: new Date("2026-05-02T14:00:00Z"),
    },
  });
  await prisma.orderItem.create({
    data: {
      orderId: order1.id,
      productId: cookies.id,
      sellerId: sarah.sellerProfile.userId,
      quantity: 2,
      price: new Prisma.Decimal(2500),
      sellerAmount: new Prisma.Decimal(4750),
      platformFee: new Prisma.Decimal(250),
      paymentStatus: "PAID",
      status: "DELIVERED",
      buyerConfirmed: true,
      sellerConfirmed: true,
      deliveredAt: new Date("2026-05-02T14:00:00Z"),
    },
  });

  // ORDER 2: Seller confirmed, buyer hasn't yet
  // Tests: "Awaiting buyer" on seller side, "Confirm Received" on buyer side
  const order2 = await prisma.order.create({
    data: {
      userId: testUser.id,
      totalAmount: new Prisma.Decimal(25000),
      status: "PENDING",
      paymentStatus: "PAID",
      paymentReference: "CUB-test002-seed",
      paidAt: new Date("2026-06-01T09:00:00Z"),
    },
  });
  await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      productId: keyboard.id,
      sellerId: michael.sellerProfile.userId,
      quantity: 1,
      price: new Prisma.Decimal(25000),
      sellerAmount: new Prisma.Decimal(23750),
      platformFee: new Prisma.Decimal(1250),
      paymentStatus: "PAID",
      status: "PENDING",
      buyerConfirmed: false,
      sellerConfirmed: true, // seller already marked delivered
    },
  });

  // ORDER 3: Neither confirmed yet — fresh active order
  // Tests: "Mark Delivered" on seller side, "Confirm Received" on buyer side
  const order3 = await prisma.order.create({
    data: {
      userId: testUser.id,
      totalAmount: new Prisma.Decimal(45000),
      status: "PENDING",
      paymentStatus: "PAID",
      paymentReference: "CUB-test003-seed",
      paidAt: new Date("2026-06-10T08:00:00Z"),
    },
  });
  await prisma.orderItem.create({
    data: {
      orderId: order3.id,
      productId: ssd.id,
      sellerId: michael.sellerProfile.userId,
      quantity: 1,
      price: new Prisma.Decimal(45000),
      sellerAmount: new Prisma.Decimal(42750),
      platformFee: new Prisma.Decimal(2250),
      paymentStatus: "PAID",
      status: "PENDING",
      buyerConfirmed: false,
      sellerConfirmed: false,
    },
  });

  // ORDER 4: Multi-item order — one delivered, one still pending
  // Tests: mixed item states within one order
  const order4 = await prisma.order.create({
    data: {
      userId: testUser.id,
      totalAmount: new Prisma.Decimal(14000),
      status: "PENDING",
      paymentStatus: "PAID",
      paymentReference: "CUB-test004-seed",
      paidAt: new Date("2026-06-08T11:00:00Z"),
    },
  });
  await prisma.orderItem.create({
    data: {
      orderId: order4.id,
      productId: juice.id,
      sellerId: sarah.sellerProfile.userId,
      quantity: 3,
      price: new Prisma.Decimal(2000),
      sellerAmount: new Prisma.Decimal(5700),
      platformFee: new Prisma.Decimal(300),
      paymentStatus: "PAID",
      status: "DELIVERED",
      buyerConfirmed: true,
      sellerConfirmed: true,
      deliveredAt: new Date("2026-06-09T10:00:00Z"),
    },
  });
  await prisma.orderItem.create({
    data: {
      orderId: order4.id,
      productId: cargoPants.id,
      sellerId: daniel.sellerProfile.userId,
      quantity: 1,
      price: new Prisma.Decimal(12000),
      sellerAmount: new Prisma.Decimal(11400),
      platformFee: new Prisma.Decimal(600),
      paymentStatus: "PAID",
      status: "PENDING",
      buyerConfirmed: false,
      sellerConfirmed: false,
    },
  });

  // ORDER 5: Cancelled order
  // Tests: cancelled state rendering
  const order5 = await prisma.order.create({
    data: {
      userId: testUser.id,
      totalAmount: new Prisma.Decimal(7000),
      status: "CANCELLED",
      paymentStatus: "PAID",
      paymentReference: "CUB-test005-seed",
      paidAt: new Date("2026-05-15T14:00:00Z"),
    },
  });
  await prisma.orderItem.create({
    data: {
      orderId: order5.id,
      productId: hoodie.id,
      sellerId: daniel.sellerProfile.userId,
      quantity: 1,
      price: new Prisma.Decimal(7000),
      sellerAmount: new Prisma.Decimal(6650),
      platformFee: new Prisma.Decimal(350),
      paymentStatus: "PAID",
      status: "CANCELLED",
      buyerConfirmed: false,
      sellerConfirmed: false,
    },
  });

  console.log("🛒 Test User orders created");

  // -------------------------------------------------------
  // ORDERS — Kosi as buyer (buying from other sellers)
  // -------------------------------------------------------

  // ORDER 6: Kosi buys from Sarah — active, no confirmation yet
  const order6 = await prisma.order.create({
    data: {
      userId: kosi.id,
      totalAmount: new Prisma.Decimal(3000),
      status: "PENDING",
      paymentStatus: "PAID",
      paymentReference: "CUB-kosi001-seed",
      paidAt: new Date("2026-06-11T07:00:00Z"),
    },
  });
  await prisma.orderItem.create({
    data: {
      orderId: order6.id,
      productId: cookies.id,
      sellerId: sarah.sellerProfile.userId,
      quantity: 1,
      price: new Prisma.Decimal(2500),
      sellerAmount: new Prisma.Decimal(2375),
      platformFee: new Prisma.Decimal(125),
      paymentStatus: "PAID",
      status: "PENDING",
      buyerConfirmed: false,
      sellerConfirmed: false,
    },
  });

  // ORDER 7: Kosi buys from Daniel — delivered
  const order7 = await prisma.order.create({
    data: {
      userId: kosi.id,
      totalAmount: new Prisma.Decimal(15000),
      status: "DELIVERED",
      paymentStatus: "PAID",
      paymentReference: "CUB-kosi002-seed",
      paidAt: new Date("2026-05-20T10:00:00Z"),
    },
  });
  await prisma.orderItem.create({
    data: {
      orderId: order7.id,
      productId: hoodie.id,
      sellerId: daniel.sellerProfile.userId,
      quantity: 1,
      price: new Prisma.Decimal(15000),
      sellerAmount: new Prisma.Decimal(14250),
      platformFee: new Prisma.Decimal(750),
      paymentStatus: "PAID",
      status: "DELIVERED",
      buyerConfirmed: true,
      sellerConfirmed: true,
      deliveredAt: new Date("2026-05-21T12:00:00Z"),
    },
  });

  console.log("🛒 Kosi orders created");

  // -------------------------------------------------------
  // ORDERS — Kosi's shop receiving orders (as seller)
  // Tests Kosi's seller dashboard active/history tabs
  // -------------------------------------------------------

  // ORDER 8: Test User buys from Kosi's Corner — pending, no confirmations
  const order8 = await prisma.order.create({
    data: {
      userId: testUser.id,
      totalAmount: new Prisma.Decimal(1800),
      status: "PENDING",
      paymentStatus: "PAID",
      paymentReference: "CUB-kosi-shop001-seed",
      paidAt: new Date("2026-06-12T06:00:00Z"),
    },
  });
  await prisma.orderItem.create({
    data: {
      orderId: order8.id,
      productId: jollof.id,
      sellerId: kosi.sellerProfile.userId,
      quantity: 1,
      price: new Prisma.Decimal(1800),
      sellerAmount: new Prisma.Decimal(1710),
      platformFee: new Prisma.Decimal(90),
      paymentStatus: "PAID",
      status: "PENDING",
      buyerConfirmed: false,
      sellerConfirmed: false,
    },
  });

  // ORDER 9: Test User buys from Kosi's Corner — seller confirmed, awaiting buyer
  const order9 = await prisma.order.create({
    data: {
      userId: testUser.id,
      totalAmount: new Prisma.Decimal(2800),
      status: "PENDING",
      paymentStatus: "PAID",
      paymentReference: "CUB-kosi-shop002-seed",
      paidAt: new Date("2026-06-11T15:00:00Z"),
    },
  });
  await prisma.orderItem.create({
    data: {
      orderId: order9.id,
      productId: chinChin.id,
      sellerId: kosi.sellerProfile.userId,
      quantity: 2,
      price: new Prisma.Decimal(1000),
      sellerAmount: new Prisma.Decimal(1900),
      platformFee: new Prisma.Decimal(100),
      paymentStatus: "PAID",
      status: "PENDING",
      buyerConfirmed: false,
      sellerConfirmed: true, // Kosi marked it delivered, waiting on Test User
    },
  });

  // ORDER 10: Fully delivered order in Kosi's shop history
  const order10 = await prisma.order.create({
    data: {
      userId: testUser.id,
      totalAmount: new Prisma.Decimal(1000),
      status: "DELIVERED",
      paymentStatus: "PAID",
      paymentReference: "CUB-kosi-shop003-seed",
      paidAt: new Date("2026-06-05T09:00:00Z"),
    },
  });
  await prisma.orderItem.create({
    data: {
      orderId: order10.id,
      productId: chinChin.id,
      sellerId: kosi.sellerProfile.userId,
      quantity: 1,
      price: new Prisma.Decimal(1000),
      sellerAmount: new Prisma.Decimal(950),
      platformFee: new Prisma.Decimal(50),
      paymentStatus: "PAID",
      status: "DELIVERED",
      buyerConfirmed: true,
      sellerConfirmed: true,
      deliveredAt: new Date("2026-06-06T11:00:00Z"),
    },
  });

  console.log("🏪 Kosi shop orders created");

  // -------------------------------------------------------
  // WALLET TRANSACTIONS & BALANCES for Kosi
  // -------------------------------------------------------
  // Reflects: order10 delivered (950 released), order9 pending (1900 pending)

  await prisma.sellerProfile.update({
    where: { userId: kosi.sellerProfile.userId },
    data: {
      availableBalance: new Prisma.Decimal(950), // from order10
      pendingBalance: new Prisma.Decimal(1900), // from order9 (sellerConfirmed, not yet released)
    },
  });

  await prisma.walletTransaction.create({
    data: {
      sellerId: kosi.sellerProfile.userId,
      amount: new Prisma.Decimal(1900),
      type: "CREDIT_PENDING",
      description: "Payment received for order CUB-kosi-s",
      reference: "CUB-kosi-shop002-seed",
    },
  });
  await prisma.walletTransaction.create({
    data: {
      sellerId: kosi.sellerProfile.userId,
      amount: new Prisma.Decimal(1000),
      type: "CREDIT_PENDING",
      description: "Payment received for order CUB-kosi-s",
      reference: "CUB-kosi-shop003-seed",
    },
  });
  await prisma.walletTransaction.create({
    data: {
      sellerId: kosi.sellerProfile.userId,
      amount: new Prisma.Decimal(1000),
      type: "RELEASE_FUNDS",
      description: "Funds released for order item (chin chin)",
      reference: null,
    },
  });
  // A past withdrawal Kosi already made
  await prisma.walletTransaction.create({
    data: {
      sellerId: kosi.sellerProfile.userId,
      amount: new Prisma.Decimal(500),
      type: "WITHDRAWAL",
      description: "Withdrawal to GTBank 0123456789",
      reference: "WD-kosieze-seed01",
    },
  });

  await prisma.withdrawal.create({
    data: {
      sellerId: kosi.sellerProfile.userId,
      amount: new Prisma.Decimal(500),
      status: "SUCCESS",
      bankName: "GTBank",
      accountNumber: "0123456789",
      accountName: "Kosi Eze",
      reference: "WD-kosieze-seed01",
      processedAt: new Date("2026-06-07T10:00:00Z"),
    },
  });

  // A pending withdrawal request
  await prisma.withdrawal.create({
    data: {
      sellerId: kosi.sellerProfile.userId,
      amount: new Prisma.Decimal(450),
      status: "PENDING",
      bankName: "Access Bank",
      accountNumber: "9876543210",
      accountName: "Kosi Eze",
      reference: "WD-kosieze-seed02",
    },
  });

  // -------------------------------------------------------
  // WALLET TRANSACTIONS & BALANCES for Daniel
  // Tests: seller with more history — released funds from
  // order1 (Test User) and order7 (Kosi)
  // -------------------------------------------------------

  await prisma.sellerProfile.update({
    where: { userId: daniel.sellerProfile.userId },
    data: {
      availableBalance: new Prisma.Decimal(28500), // 14250 (order1 hoodie) + 14250 (order7 hoodie)
      pendingBalance: new Prisma.Decimal(0),
    },
  });

  await prisma.walletTransaction.create({
    data: {
      sellerId: daniel.sellerProfile.userId,
      amount: new Prisma.Decimal(14250),
      type: "CREDIT_PENDING",
      description: "Payment received for order CUB-test00",
      reference: "CUB-test001-seed",
    },
  });
  await prisma.walletTransaction.create({
    data: {
      sellerId: daniel.sellerProfile.userId,
      amount: new Prisma.Decimal(14250),
      type: "RELEASE_FUNDS",
      description: "Funds released for order item (hoodie - Test User)",
    },
  });
  await prisma.walletTransaction.create({
    data: {
      sellerId: daniel.sellerProfile.userId,
      amount: new Prisma.Decimal(14250),
      type: "CREDIT_PENDING",
      description: "Payment received for order CUB-kosi00",
      reference: "CUB-kosi002-seed",
    },
  });
  await prisma.walletTransaction.create({
    data: {
      sellerId: daniel.sellerProfile.userId,
      amount: new Prisma.Decimal(14250),
      type: "RELEASE_FUNDS",
      description: "Funds released for order item (hoodie - Kosi)",
    },
  });

  // -------------------------------------------------------
  // WALLET TRANSACTIONS & BALANCES for Michael
  // order2: keyboard pending (23750), order3: ssd pending (42750)
  // -------------------------------------------------------

  await prisma.sellerProfile.update({
    where: { userId: michael.sellerProfile.userId },
    data: {
      availableBalance: new Prisma.Decimal(0),
      pendingBalance: new Prisma.Decimal(66500), // 23750 + 42750
    },
  });

  await prisma.walletTransaction.create({
    data: {
      sellerId: michael.sellerProfile.userId,
      amount: new Prisma.Decimal(23750),
      type: "CREDIT_PENDING",
      description: "Payment received for order CUB-test00",
      reference: "CUB-test002-seed",
    },
  });
  await prisma.walletTransaction.create({
    data: {
      sellerId: michael.sellerProfile.userId,
      amount: new Prisma.Decimal(42750),
      type: "CREDIT_PENDING",
      description: "Payment received for order CUB-test00",
      reference: "CUB-test003-seed",
    },
  });

  console.log("💰 Wallet transactions and balances set");
  console.log("🎉 Seeding complete!");
  console.log("");
  console.log("Test accounts (password: 'password'):");
  console.log("  Buyer  → test@cubazzar.com");
  console.log("  Seller/Buyer → kosi@cubazzar.com");
  console.log("  Seller → daniel@cubazzar.com");
  console.log("  Seller → michael@cubazzar.com");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
