import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  context: { params: { id: string } }
) => {
  const { id } = context.params;

  let productMeta;

  try {
    productMeta = await prisma.product.findFirst({
      where: {
        id: id,
      },
      select: {
        name: true,
        description: true,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "there is some error in the server." },
      { status: 500 }
    );
  }

  return NextResponse.json(productMeta);
};
