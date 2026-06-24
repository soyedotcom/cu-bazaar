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
      {
        name: "Denim Trucker Jacket",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
        description: "Classic blue denim jacket, layers over any outfit.",
        price: 16500,
        category: "Products",
        subcategory: "Fashion",
        section: "Tops",
        tags: ["denim", "jacket", "layering"],
        features: ["Denim", "Button-front"],
        variants: { sizes: ["S", "M", "L", "XL"] },
      },
      {
        name: "Slim Fit Joggers",
        image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea",
        description: "Stretch joggers with tapered ankle cuffs for comfort.",
        price: 9500,
        category: "Products",
        subcategory: "Fashion",
        section: "Bottoms",
        tags: ["joggers", "sweatpants", "casual"],
        variants: { sizes: ["S", "M", "L"], colors: ["Black", "Navy"] },
      },
      {
        name: "Ripped Skinny Jeans",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
        description: "Distressed skinny jeans with stretch denim fabric.",
        price: 13500,
        category: "Products",
        subcategory: "Fashion",
        section: "Bottoms",
        tags: ["jeans", "denim", "ripped"],
        variants: { sizes: ["28", "30", "32", "34"] },
      },
      {
        name: "Canvas High-Top Sneakers",
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
        description: "Lace-up canvas high-tops for an everyday street look.",
        price: 14000,
        category: "Products",
        subcategory: "Fashion",
        section: "Shoes",
        tags: ["sneakers", "canvas", "shoes"],
        variants: {
          sizes: ["40", "41", "42", "43"],
          colors: ["Black", "White"],
        },
      },
      {
        name: "Leather Slide Sandals",
        image: "https://images.unsplash.com/photo-1603487742131-4160ec999306",
        description: "Comfortable faux-leather slides for hostel and hangouts.",
        price: 6500,
        category: "Products",
        subcategory: "Fashion",
        section: "Shoes",
        tags: ["sandals", "slides", "shoes"],
      },
      {
        name: "Stainless Steel Wrist Watch",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
        description: "Minimalist analog watch with stainless steel strap.",
        price: 11000,
        category: "Products",
        subcategory: "Fashion",
        section: "Jewelry and Accessories",
        tags: ["watch", "accessories"],
      },
      {
        name: "Beaded Bracelet Set",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a",
        description: "Set of 3 stackable beaded bracelets.",
        price: 3500,
        category: "Products",
        subcategory: "Fashion",
        section: "Jewelry and Accessories",
        tags: ["bracelet", "beads", "accessories"],
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
      {
        name: "Nigerian Meat Pie",
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
        description:
          "Flaky pastry filled with seasoned minced meat and potatoes.",
        price: 1000,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Snacks",
        tags: ["meat pie", "pastry", "snack"],
      },
      {
        name: "Caramel Popcorn Pack",
        image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f",
        description: "Sweet caramel-coated popcorn, perfect for movie nights.",
        price: 1300,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Snacks",
        tags: ["popcorn", "caramel", "snack"],
      },
      {
        name: "Glazed Doughnuts (6pcs)",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307",
        description: "Soft glazed doughnuts, freshly made.",
        price: 2800,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Snacks",
        tags: ["doughnuts", "pastry", "snack"],
      },
      {
        name: "Banana Bread Slice",
        image: "https://images.unsplash.com/photo-1606101273945-e9a131db6e22",
        description: "Moist homemade banana bread, sliced and packed.",
        price: 1500,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Snacks",
        tags: ["banana bread", "baked", "snack"],
      },
      {
        name: "Zobo Drink (Hibiscus)",
        image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4",
        description:
          "Chilled homemade zobo drink infused with fruits and spices.",
        price: 1500,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Drinks",
        tags: ["zobo", "hibiscus", "drink"],
      },
      {
        name: "Chapman Mocktail",
        image: "https://images.unsplash.com/photo-1546171753-97d7676e4602",
        description: "Refreshing Nigerian mocktail mix, served chilled.",
        price: 2200,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Drinks",
        tags: ["chapman", "mocktail", "drink"],
      },
      {
        name: "Smoothie Cup",
        image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc",
        description: "Blended fruit and yoghurt smoothie in a to-go cup.",
        price: 2500,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Drinks",
        tags: ["smoothie", "fruit", "drink"],
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
        subcategory: "Gadgets and Accessories",
        section: "Laptops",
      },
      {
        name: "Wireless Gaming Mouse",
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db",
        description: "Smooth wireless control.",
        price: 15000,
        category: "Products",
        subcategory: "Gadgets and Accessories",
        section: "Peripherals",
      },
      {
        name: "Mechanical Keyboard",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
        description: "RGB mechanical keyboard.",
        price: 25000,
        category: "Products",
        subcategory: "Gadgets and Accessories",
        section: "Peripherals",
      },
      {
        name: "External SSD 1TB",
        image: "https://images.unsplash.com/photo-1612810806695-30f7a8258391",
        description: "Fast portable storage.",
        price: 45000,
        category: "Products",
        subcategory: "Gadgets and Accessories",
        section: "Storage Devices",
      },
      {
        name: "USB-C Hub",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
        description: "Multi-port USB-C expansion.",
        price: 8000,
        category: "Products",
        subcategory: "Gadgets and Accessories",
        section: "Peripherals",
      },
      {
        name: "Samsung Galaxy Tab A8",
        image: "https://images.unsplash.com/photo-1561154464-82e9adf32764",
        description: "10.5-inch Android tablet, great for notes and streaming.",
        price: 165000,
        category: "Products",
        subcategory: "Gadgets and Accessories",
        section: "Tablets",
        tags: ["tablet", "samsung", "android"],
      },
      {
        name: "Tablet Stylus Pen",
        image: "https://images.unsplash.com/photo-1585789575421-487f2e6e2cd5",
        description:
          "Capacitive stylus pen for note-taking and sketching on tablets.",
        price: 6000,
        category: "Products",
        subcategory: "Gadgets and Accessories",
        section: "Tablets",
        tags: ["stylus", "tablet", "accessory"],
      },
      {
        name: "Wireless Bluetooth Earbuds",
        image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbd",
        description: "Noise-isolating earbuds with charging case.",
        price: 22000,
        category: "Products",
        subcategory: "Gadgets and Accessories",
        section: "Peripherals",
        tags: ["earbuds", "bluetooth", "audio"],
      },
      {
        name: "Laptop Cooling Pad",
        image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c",
        description: "Dual-fan cooling pad to keep laptops running cool.",
        price: 9500,
        category: "Products",
        subcategory: "Gadgets and Accessories",
        section: "Peripherals",
        tags: ["cooling pad", "laptop accessory"],
      },
      {
        name: "20000mAh Power Bank",
        image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5",
        description: "High-capacity power bank with fast charging support.",
        price: 14000,
        category: "Products",
        subcategory: "Gadgets and Accessories",
        section: "Peripherals",
        tags: ["power bank", "charging", "portable"],
      },
      {
        name: "Arduino Uno R3 Starter Kit",
        image: "https://images.unsplash.com/photo-1553406830-ef409b07f8a3",
        description:
          "Beginner electronics kit with Arduino board and components.",
        price: 27000,
        category: "Products",
        subcategory: "Gadgets and Accessories",
        section: "Electrionic Components",
        tags: ["arduino", "electronics", "kit"],
      },
      {
        name: "Breadboard & Jumper Wire Set",
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789",
        description:
          "830-point breadboard with assorted jumper wires for prototyping.",
        price: 4500,
        category: "Products",
        subcategory: "Gadgets and Accessories",
        section: "Electrionic Components",
        tags: ["breadboard", "jumper wires", "electronics"],
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
      {
        name: "Ironing Service",
        image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c",
        description:
          "Crisp ironing and pressing for shirts, trousers and gowns.",
        price: 1000,
        category: "Services",
        subcategory: "Laundry",
        section: "Ironing",
        tags: ["ironing", "pressing", "laundry"],
      },
      {
        name: "Dry Cleaning Service",
        image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f",
        description:
          "Gentle dry cleaning for suits, gowns and delicate fabrics.",
        price: 3500,
        category: "Services",
        subcategory: "Laundry",
        section: "Dry Cleaning",
        tags: ["dry cleaning", "laundry", "garment care"],
      },
      {
        name: "Hair Coloring (Dye)",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035",
        description: "Full hair coloring service with quality dye.",
        price: 6000,
        category: "Services",
        subcategory: "Hair Styling",
        section: "Hair Coloring",
        tags: ["hair dye", "coloring", "hair styling"],
      },
      {
        name: "Wig Installation",
        image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486",
        description:
          "Professional wig install, lace melt and styling included.",
        price: 8000,
        category: "Services",
        subcategory: "Hair Styling",
        section: "Wig Installation",
        tags: ["wig", "install", "hair styling"],
      },
      {
        name: "Phone Screen Replacement",
        image: "https://images.unsplash.com/photo-1512054502232-10a0a035d672",
        description: "Cracked screen replacement for most phone models.",
        price: 15000,
        category: "Services",
        subcategory: "Repair and Maintenance",
        section: "Screen Replacement",
        tags: ["screen repair", "phone repair"],
      },
      {
        name: "Charging Port Repair",
        image: "https://images.unsplash.com/photo-1601524909162-ae8725290836",
        description: "Fix for loose or faulty phone and laptop charging ports.",
        price: 6000,
        category: "Services",
        subcategory: "Repair and Maintenance",
        section: "Charging Port Repair",
        tags: ["charging port", "repair"],
      },
      {
        name: "Sneaker Cleaning Service",
        image: "https://images.unsplash.com/photo-1556906781-9a412961c28c",
        description: "Deep clean and whitening for sneakers and canvas shoes.",
        price: 2500,
        category: "Services",
        subcategory: "Repair and Maintenance",
        section: "Shoe Care",
        tags: ["sneaker cleaning", "shoe care"],
      },
    ],
  },
  // Kosi's shop
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
      {
        name: "Fried Rice Plate",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19",
        description: "Stir-fried rice with mixed vegetables and protein.",
        price: 1800,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Meals",
        tags: ["fried rice", "meal"],
      },
      {
        name: "Spaghetti Jollof",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
        description: "Nigerian-style jollof spaghetti, packed hot.",
        price: 1500,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Meals",
        tags: ["spaghetti", "jollof", "meal"],
      },
      {
        name: "Moi Moi (Bean Pudding)",
        image: "https://images.unsplash.com/photo-1604908554007-23e8e54b3d4d",
        description: "Steamed bean pudding wrapped and served fresh.",
        price: 700,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Snacks",
        tags: ["moi moi", "beans", "snack"],
      },
      {
        name: "Suya Stick Pack",
        image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
        description: "Spicy grilled beef suya skewers with yaji spice.",
        price: 2000,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Snacks",
        tags: ["suya", "grilled", "snack"],
      },
      {
        name: "Akara (Bean Cakes)",
        image: "https://images.unsplash.com/photo-1599490659213-e0b2275c6f8e",
        description: "Crispy deep-fried bean cakes, freshly made.",
        price: 600,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Snacks",
        tags: ["akara", "bean cakes", "snack"],
      },
      {
        name: "Sausage Roll",
        image: "https://images.unsplash.com/photo-1626078436898-7d4d4dc7a8a8",
        description: "Buttery pastry rolled around seasoned sausage filling.",
        price: 800,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Snacks",
        tags: ["sausage roll", "pastry", "snack"],
      },
      {
        name: "Kunun Aya (Tiger Nut Drink)",
        image: "https://images.unsplash.com/photo-1622597489203-91d8baa4be6e",
        description: "Chilled tiger nut milk drink, naturally sweetened.",
        price: 1200,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Drinks",
        tags: ["kunun aya", "tiger nut", "drink"],
      },
      {
        name: "Sachet Water Pack (Pure Water)",
        image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d",
        description: "Pack of chilled sachet water for hydration on the go.",
        price: 300,
        category: "Products",
        subcategory: "Food and Provisions",
        section: "Drinks",
        tags: ["water", "sachet water", "drink"],
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
