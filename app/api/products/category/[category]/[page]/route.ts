import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { totalProductsPages } from "../../../../util/products/TotalProductPages";
import { fetchProductCategoryNames } from "../../../../util/products/FetchProductCategoryNames";
import { fetchProductsCardByCondition } from "@/app/api/util/products/FetchProductsCardByCondition";

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

  let pageNum = Number(page) || 1;
  let categoryList,
    productList,
    totalPagesOfProduct: number = 0;

  try {
    const categoryName = await prisma.productCategory.findFirst({
      where: {
        URL: { equals: category, mode: "insensitive" },
      },
      select: {
        name: true,
      },
    });

    if (!categoryName) {
      return NextResponse.json(
        { message: "Such category doesn't exist." },
        { status: 404 }
      );
    }

    categoryList = await fetchProductCategoryNames();

    const filter = {
      category: categoryName.name,
    };

    totalPagesOfProduct = await totalProductsPages(filter);

    pageNum > totalPagesOfProduct && (pageNum = totalPagesOfProduct);

    productList = await fetchProductsCardByCondition({
      sort: sort,
      currentPage: pageNum,
      filter: filter,
    });
  } catch (error) {
    return NextResponse.error();
  }

  return NextResponse.json({
    categories: categoryList,
    products: productList,
    current: pageNum,
    total: totalPagesOfProduct,
  });
};
