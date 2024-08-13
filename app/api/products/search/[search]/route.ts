import { fetchProductsCard } from "@/app/api/util/products/FetchProductsCard";
import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  search: string;
};

export const GET = async (
  request: NextRequest,
  context: { params: Params }
) => {
  const { search } = context.params;

  let productList, totalProducts: number;

  try {
    totalProducts = await prisma.product.count({
      where: {
        name: { contains: search, mode: "insensitive" },
      },
    });

    productList = await fetchProductsCard({
      listLength: 3,
      filter: {
        name: { contains: search, mode: "insensitive" },
      },
      addCategory: true,
      addPrice: false,
    });
  } catch (error) {
    return NextResponse.error();
  }

  return NextResponse.json({
    list: productList,
    total: totalProducts,
  });
};
