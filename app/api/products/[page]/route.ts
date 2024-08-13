import { NextRequest, NextResponse } from "next/server";
import { totalProductsPages } from "../../util/products/TotalProductPages";
import { fetchProductCategoryNames } from "../../util/products/FetchProductCategoryNames";
import { fetchProductsCardByCondition } from "../../util/products/FetchProductsCardByCondition";

type Params = {
  page: string;
};

export const GET = async (
  request: NextRequest,
  context: { params: Params }
) => {
  const sort: string = request.nextUrl.searchParams.get("sort") || "";
  let page: number = Number(context.params.page) || 1;

  let productList, productCategories, totalPagesOfProduct;

  try {
    productCategories = await fetchProductCategoryNames();

    totalPagesOfProduct = await totalProductsPages();

    page > totalPagesOfProduct && (page = totalPagesOfProduct);

    productList = await fetchProductsCardByCondition({
      sort: sort,
      currentPage: page,
    });
  } catch (error) {
    return NextResponse.error();
  }

  console.log("call request");

  return NextResponse.json({
    current: page,
    total: totalPagesOfProduct,
    products: productList,
    categories: productCategories,
  });
};
