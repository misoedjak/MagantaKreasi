import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import fs from "fs";
import path from "path";

let prisma: PrismaClient;

let databaseUrl = process.env.DATABASE_URL || "file:./dev.db";

if (process.env.NODE_ENV === "production" && process.env.VERCEL) {
  const srcDbPath = path.join(process.cwd(), "dev.db");
  const destDbPath = "/tmp/dev.db";
  try {
    if (!fs.existsSync(destDbPath)) {
      if (fs.existsSync(srcDbPath)) {
        fs.copyFileSync(srcDbPath, destDbPath);
        console.log("Database initialized from build: copied to /tmp/dev.db");
      } else {
        console.warn("Database file not found in build path:", srcDbPath);
      }
    } else {
      console.log("Using existing /tmp/dev.db");
    }
  } catch (err) {
    console.error("Failed to copy database to /tmp", err);
  }
  databaseUrl = "file:/tmp/dev.db";
}

if (process.env.NODE_ENV === "production") {
  const adapter = new PrismaBetterSqlite3({ url: databaseUrl });
  prisma = new PrismaClient({ adapter });
} else {
  // Prevent multiple instances of Prisma Client in development due to hot reloading
  if (!(global as any).prisma) {
    const adapter = new PrismaBetterSqlite3({ url: databaseUrl });
    (global as any).prisma = new PrismaClient({ adapter });
  }
  prisma = (global as any).prisma;
}

export { prisma };
