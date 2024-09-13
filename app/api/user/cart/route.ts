import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import {
  deleteUserCartItems,
  getUserFromFirebase,
  getUserPrismaId,
} from "../../api-lib";
import { CartItemType } from "@/app/utils/Interfaces";
import { headers } from "next/headers";

export const POST = async (request: NextRequest) => {
  const cart = await request.json();

  const token = headers().get("authorization");

  const { validUser, error } = await getUserFromFirebase(token);

  const { id, userPrismaError } = await getUserPrismaId(validUser.uid);

  if (error.hasError || userPrismaError) {
    return NextResponse.json(
      { message: "There is some issue in the database." },
      { status: 500 }
    );
  }

  try {
    let isCartIemExisted = await prisma.cartItem.findFirst({
      where: {
        userId: id,
        id: cart.id,
        size: cart.size,
      },
    });

    if (isCartIemExisted) {
      await prisma.cartItem.update({
        where: {
          cartItemId: isCartIemExisted.cartItemId,
        },
        data: {
          quantity: isCartIemExisted.quantity + cart.quantity,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          userId: id,
          id: cart.id,
          size: cart.size,
          quantity: cart.quantity,
        },
      });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Server internal issue. Please try again." },
      { status: 500 }
    );
  }

  let userCart: CartItemType[] | [];
  try {
    userCart = await prisma.cartItem.findMany({
      where: {
        userId: id,
      },
      select: {
        id: true,
        size: true,
        quantity: true,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Server internal issue. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json(userCart);
};

export const GET = async (request: NextRequest) => {
  const token = headers().get("authorization");

  const { validUser, error } = await getUserFromFirebase(token);

  const { id, userPrismaError } = await getUserPrismaId(validUser.uid);

  if (error.hasError || userPrismaError) {
    return NextResponse.json(
      { message: "There is some issue with database." },
      { status: 500 }
    );
  }

  let cartLIst;
  try {
    cartLIst = await prisma.cartItem.findMany({
      where: {
        userId: id,
      },
      select: {
        id: true,
        quantity: true,
        size: true,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "There is some issue in server." },
      { status: 500 }
    );
  }

  return NextResponse.json(cartLIst);
};

export const DELETE = async (request: NextRequest) => {
  const token = headers().get("authorization");

  const { validUser, error } = await getUserFromFirebase(token);

  const { id, userPrismaError } = await getUserPrismaId(validUser.uid);

  if (error.hasError || userPrismaError) {
    return NextResponse.json(
      { message: "There is some issue in the database." },
      { status: 500 }
    );
  }
  const deleteUserCart = await deleteUserCartItems(id);

  if (!deleteUserCart) {
    return NextResponse.json(
      {
        message: "There is some issue in the database.",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({ status: 200 });
};
