import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { fetchBlogsCardByCondition } from "@/app/api/util/blogs/FetchBlogsCardByCondition";
import { fetchBlogsCategoryNames } from "@/app/api/util/blogs/FetchBlogsCategoryNames";
import { totalBlogPages } from "@/app/api/util/blogs/TotalBlogPages";

type Params = {
  category: string;
  page: string;
};

export const GET = async (
  request: NextRequest,
  context: { params: Params }
) => {
  const { category, page } = context.params;
  const sort = request.nextUrl.searchParams.get("sort") || "";

  let pageNum = Number(page) || 1,
    categoryList,
    blogList,
    totalPagesOfBlog: number = 0;

  try {
    const categoryName = await prisma.blogCategory.findFirst({
      where: {
        URL: { equals: category, mode: "insensitive" },
      },
      select: {
        name: true,
      },
    });

    if (!categoryName) {
      return NextResponse.json(
        { message: "Such category doesn't exist" },
        { status: 404 }
      );
    }

    totalPagesOfBlog = await totalBlogPages({
      category: { equals: categoryName.name, mode: "insensitive" },
    });

    categoryList = await fetchBlogsCategoryNames();

    pageNum > totalPagesOfBlog && (pageNum = totalPagesOfBlog);

    blogList = await fetchBlogsCardByCondition({
      sort,
      currentPage: pageNum,
      filter: {
        category: categoryName.name,
      },
    });
  } catch (error) {
    return NextResponse.error();
  }

  return NextResponse.json({
    current: pageNum,
    blogs: blogList,
    total: totalPagesOfBlog,
    categories: categoryList,
  });
};
