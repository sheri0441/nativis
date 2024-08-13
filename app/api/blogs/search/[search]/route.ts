import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { fetchBlogsCard } from "@/app/api/util/blogs/FetchBlogsCard";

type Params = {
  search: string;
};

export const GET = async (
  request: NextRequest,
  context: { params: Params }
) => {
  const { search } = context.params;

  let blogList, totalBlogs;

  try {
    totalBlogs = await prisma.blog.count({
      where: {
        title: { contains: search, mode: "insensitive" },
      },
    });

    blogList = await fetchBlogsCard({
      listLength: 3,
      filter: {
        title: { contains: search, mode: "insensitive" },
      },
      addCreationDate: false,
      addLikes: false,
    });
  } catch (error) {
    return NextResponse.error();
  }

  return NextResponse.json({
    list: blogList,
    total: totalBlogs,
  });
};
