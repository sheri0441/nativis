import { CartItemType } from "@/app/utils/Interfaces";
import { prisma } from "@/prisma/prisma";
import { JsonValue } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

type Price = {
  [key: string]: number;
};

export const POST = async (request: NextRequest) => {
  const cartList: CartItemType[] = await request.json();

  if (cartList.length === 0 || !cartList) {
    return NextResponse.json([]);
  }

  const cartListStringArray = cartList.map((item: CartItemType) => item.id);

  let cart: {
    id: string;
    name: string;
    price: JsonValue;
    thumbnail: string;
  }[] = [];
  try {
    cart = await prisma.product.findMany({
      where: {
        id: { in: cartListStringArray },
      },
      select: {
        id: true,
        name: true,
        price: true,
        thumbnail: true,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "There is some error in background. Please try later." },
      { status: 500 }
    );
  }

  if (!cart || cart === null) {
    return NextResponse.json(
      { message: "There is some error in background. Please try later." },
      { status: 500 }
    );
  }

  let modifyCartList = [];
  for (let i = 0; i < cartList.length; i++) {
    for (let e = 0; e < cart.length; e++) {
      if (cartList[i].id === cart[e].id && typeof cart[e].price == "object") {
        const size = cartList[i].size;
        if (size) {
          const price = (cart[e].price as Price)[size];
          modifyCartList.push({
            id: cart[e].id,
            name: cart[e].name + " (" + size + ")",
            price: price,
            quantity: cartList[i].quantity,
            thumbnail: cart[e].thumbnail,
          });
        } else {
          const price = Object.values(cart[e].price as Price)[0];
          modifyCartList.push({
            id: cart[e].id,
            name: cart[e].name,
            price: price,
            quantity: cartList[i].quantity,
            thumbnail: cart[e].thumbnail,
          });
        }
      }
    }
  }

  return NextResponse.json(modifyCartList);
};
