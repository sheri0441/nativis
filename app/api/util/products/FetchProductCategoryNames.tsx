import { prisma } from "@/prisma/prisma";

export const fetchProductCategoryNames = async () => {
  return await prisma.productCategory.findMany({
    select: {
      name: true,
    },
  });
};
