import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { fetchProductsCard } from "../../../util/products/FetchProductsCard";
import { randomFourProductsCard } from "@/app/api/util/misc/RandomFourProductsCard";

type Params = {
  id: string;
};

export const GET = async (
  request: NextRequest,
  context: { params: Params }
) => {
  let id = context.params.id;
  let product, relatedProducts, otherProduct;

  try {
    product = await prisma.product.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        images: true,
        category: true,
        related: true,
        guide: true,
        ingredient: true,
        suitable: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "No products found" },
        { status: 404 }
      );
    }

    if (product.related.length > 0) {
      relatedProducts = await fetchProductsCard({
        filter: {
          id: { in: product.related },
        },
        listLength: 4,
      });
    }

    otherProduct = await randomFourProductsCard({
      NOT: {
        name: { equals: product.name, mode: "insensitive" },
      },
    });
  } catch (error) {
    return NextResponse.error();
  }

  return NextResponse.json({
    product: product,
    relatedProducts: relatedProducts,
    otherProducts: otherProduct,
  });
};
