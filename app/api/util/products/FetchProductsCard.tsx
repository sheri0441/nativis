import { prisma } from "@/prisma/prisma";

export const fetchProductsCard = async ({
  currentPage = 1,
  order = {},
  filter = {},
  listLength = 12,
  skip = (currentPage - 1) * 12,
  addCategory = false,
  addPrice = true,
}: {
  currentPage?: number;
  order?: {};
  filter?: {};
  listLength?: number;
  skip?: number;
  addCategory?: boolean;
  addPrice?: boolean;
}) => {
  return await prisma.product.findMany({
    where: filter,
    take: listLength,
    skip: skip,
    select: {
      id: true,
      name: true,
      price: addPrice ? true : false,
      thumbnail: true,
      category: addCategory ? true : false,
    },
    orderBy: order,
  });
};
