import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { getUserFromFirebase, getUserPrismaId } from "@/app/api/api-lib";
import { headers } from "next/headers";

type Params = {
  id: string;
};

export const DELETE = async (
  request: NextRequest,
  context: { params: Params }
) => {
  let cartId = context.params.id;

  const token = headers().get("authorization");

  const { validUser, error } = await getUserFromFirebase(token);
  const { id, userPrismaError } = await getUserPrismaId(validUser.uid);
  if (error.hasError || userPrismaError) {
    return NextResponse.json(
      { message: "There is some issue in the server and database." },
      { status: 500 }
    );
  }

  try {
    let cartItem = await prisma.cartItem.findFirst({
      where: {
        id: cartId,
        userId: id,
      },
    });

    await prisma.cartItem.delete({
      where: {
        cartItemId: cartItem?.cartItemId,
      },
    });
  } catch (error) {}

  let cartList = await prisma.cartItem.findMany({
    where: {
      userId: id,
    },
  });

  return NextResponse.json(cartList);
};
