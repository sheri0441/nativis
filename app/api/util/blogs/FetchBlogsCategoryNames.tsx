import { prisma } from "@/prisma/prisma";

export const fetchBlogsCategoryNames = async () => {
  return await prisma.blogCategory.findMany({
    select: {
      name: true,
    },
  });
};
