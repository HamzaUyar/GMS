import { PrismaClient } from '@prisma/client'

// Declare a global variable to hold the Prisma client instance.
// This prevents creating multiple instances in development due to hot reloading.
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// Initialize PrismaClient only if it doesn't already exist.
// In production, global.prisma will always be undefined initially.
// In development, global.prisma might persist across hot reloads.
export const prisma = global.prisma || new PrismaClient();

// In development, assign the new instance to the global variable.
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
} 