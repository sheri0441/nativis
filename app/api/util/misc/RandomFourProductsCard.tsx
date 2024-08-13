import { prisma } from "@/prisma/prisma";
import { fetchProductsCard } from "../products/FetchProductsCard";

export const randomFourProductsCard = async (filter?: {}) => {
  const totalNumberOfProduct = await prisma.product.count({
    where: filter,
  });

  const totalFourPairNumber = Math.floor(totalNumberOfProduct / 4);

  return await fetchProductsCard({
    filter: filter,
    listLength: 4,
    skip: Math.floor(Math.random() * totalFourPairNumber),
  });
};
