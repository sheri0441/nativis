import { NextRequest, NextResponse } from "next/server";
import { fetchBlogsCardByCondition } from "../../util/blogs/FetchBlogsCardByCondition";
import { totalBlogPages } from "../../util/blogs/TotalBlogPages";
import { fetchBlogsCategoryNames } from "../../util/blogs/FetchBlogsCategoryNames";

type Params = {
  page: string;
};

export const GET = async (
  request: NextRequest,
  context: { params: Params }
) => {
  const sort: string = request.nextUrl.searchParams.get("sort") || "";
  let page: number = Number(context.params.page) || 1;

  let blogList, blogCategories, totalPagesOfBlog;

  try {
    blogCategories = await fetchBlogsCategoryNames();

    totalPagesOfBlog = await totalBlogPages();

    page > totalPagesOfBlog && (page = totalPagesOfBlog);

    blogList = await fetchBlogsCardByCondition({ currentPage: page, sort });
  } catch (error) {
    return NextResponse.error();
  }

  return NextResponse.json({
    current: page,
    total: totalPagesOfBlog,
    blogs: blogList,
    categories: blogCategories,
  });
};
