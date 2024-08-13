import { prisma } from "@/prisma/prisma";

export const totalBlogPages = async (filter?: {}) => {
  const totalBlogsNumber = await prisma.blog.count({ where: filter });

  return Math.ceil(totalBlogsNumber / 12);
};
