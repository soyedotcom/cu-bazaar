import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

const connectToDB = async () => {
  try {
    await prisma.$connect();
    console.log("connected to database");
  } catch (error) {
    console.error(`unable to connect to database: ${error.message}`);
    process.exit(1);
  }
};

const disconnectFromDB = async () => {
  await prisma.disconnect();
};

export { prisma, connectToDB, disconnectFromDB };
