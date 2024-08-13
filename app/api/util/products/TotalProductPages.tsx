import { prisma } from "@/prisma/prisma";

export const totalProductsPages = async (filter?: {}) => {
  const totalProductsNumber = await prisma.product.count({ where: filter });

  return Math.ceil(totalProductsNumber / 12);
};
