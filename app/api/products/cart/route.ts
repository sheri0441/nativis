import { CartItemType } from "@/app/utils/Interfaces";
import { NextRequest, NextResponse } from "next/server";
import {
  addQuantityAndSizeInCartItems,
  extractIdFromCartList,
  fetchCartItemFromPrismaById,
} from "../../api-lib";

export const POST = async (request: NextRequest) => {
  const cartList: CartItemType[] = await request.json();

  if (cartList.length === 0 || !cartList) {
    return NextResponse.json([]);
  }

  const cartListIdArray = extractIdFromCartList(cartList);

  const { cart, prismaCartError } = await fetchCartItemFromPrismaById(
    cartListIdArray
  );

  if (prismaCartError || cart === null) {
    return NextResponse.json(
      { message: "There is some error in backend. Please try later." },
      { status: 500 }
    );
  }

  const fullCartItemList = addQuantityAndSizeInCartItems({
    prismaCartList: cart,
    cartList,
  });

  return NextResponse.json(fullCartItemList);
};
