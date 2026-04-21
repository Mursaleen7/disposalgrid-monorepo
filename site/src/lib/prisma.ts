import { PrismaClient } from "@prisma/client";

/**
 * Singleton PrismaClient for Next.js
 *
 * In development, Next.js hot-reloads modules, which would create
 * multiple PrismaClient instances. This pattern stores the client
 * on globalThis to prevent that.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
