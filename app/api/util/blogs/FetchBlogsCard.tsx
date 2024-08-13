import { prisma } from "@/prisma/prisma";

export const fetchBlogsCard = async ({
  currentPage = 1,
  filter = {},
  order = {},
  listLength = 12,
  skip = (currentPage - 1) * 12,
  addCreationDate = true,
  addLikes = true,
}: {
  currentPage?: number;
  filter?: {};
  order?: {};
  listLength?: number;
  skip?: number;
  addCreationDate?: boolean;
  addLikes?: boolean;
}) => {
  return await prisma.blog.findMany({
    where: filter,
    take: listLength,
    skip: skip,
    select: {
      id: true,
      title: true,
      category: true,
      thumbnail: true,
      createdAt: addCreationDate ? true : false,
      likes: addLikes ? true : false,
    },
    orderBy: order,
  });
};
