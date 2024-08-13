import { NextRequest, NextResponse } from "next/server";
import { fetchProductsCardByCondition } from "@/app/api/util/products/FetchProductsCardByCondition";
import { totalProductsPages } from "@/app/api/util/products/TotalProductPages";

type Params = {
  search: string;
  page: string;
};

export const GET = async (
  request: NextRequest,
  context: { params: Params }
) => {
  const sort: string = request.nextUrl.searchParams.get("sort") || "";
  const { search, page } = context.params;
  let pageNum: number = Number(page) || 1;

  let totalNumberOfPages: number = 1,
    productList = [];

  try {
    totalNumberOfPages = await totalProductsPages({
      name: { contains: search, mode: "insensitive" },
    });

    pageNum > totalNumberOfPages && (pageNum = totalNumberOfPages);

    productList = await fetchProductsCardByCondition({
      sort: sort,
      currentPage: pageNum,
      filter: {
        name: { contains: search, mode: "insensitive" },
      },
    });
  } catch (error) {
    return NextResponse.error();
  }

  return NextResponse.json({
    products: productList,
    current: pageNum,
    total: totalNumberOfPages,
  });
};
