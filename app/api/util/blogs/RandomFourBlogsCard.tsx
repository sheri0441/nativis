import { prisma } from "@/prisma/prisma";
import { fetchBlogsCard } from "./FetchBlogsCard";

export const randomFourBlogsCard = async (filter?: {}) => {
  const totalNumberOfBlogs = await prisma.blog.count({
    where: filter,
  });

  const blogsInPairOfFour = Math.floor(totalNumberOfBlogs / 4);

  return await fetchBlogsCard({
    listLength: 4,
    filter: filter,
    skip: Math.floor(Math.random() * blogsInPairOfFour),
  });
};
