import { fetchBlogsCardByCondition } from "@/app/api/util/blogs/FetchBlogsCardByCondition";
import { totalBlogPages } from "@/app/api/util/blogs/TotalBlogPages";
import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  search: string;
  page: string;
};

export const GET = async (
  request: NextRequest,
  context: { params: Params }
) => {
  const sort = request.nextUrl.searchParams.get("sort") || "";
  const { search, page } = context.params;
  let pageNum: number = Number(page) || 1;

  let totalNumberOfPages = 1,
    blogList;

  try {
    totalNumberOfPages = await totalBlogPages({
      title: { contains: search, mode: "insensitive" },
    });

    pageNum > totalNumberOfPages && (pageNum = totalNumberOfPages);

    blogList = await fetchBlogsCardByCondition({
      sort,
      currentPage: pageNum,
      filter: {
        title: { contains: search, mode: "insensitive" },
      },
    });
  } catch (error) {
    return NextResponse.error();
  }

  return NextResponse.json({
    blogs: blogList,
    current: pageNum,
    total: totalNumberOfPages,
  });
};
