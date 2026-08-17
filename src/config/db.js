import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

console.log("USER MODEL:", prisma.user);

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("DB connect to prisma");
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit();
  }
};

const disconnectDB = async () => {
  await prisma.$disconnect();
};

export { prisma, connectDB, disconnectDB };
