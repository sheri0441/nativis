import { NextRequest, NextResponse } from "next/server";
import { firebaseAdmin } from "../firebase_admin";
import { FirebaseAuthError } from "firebase-admin/auth";
import { prisma } from "@/prisma/prisma";
import { extractedToken } from "../../api-lib";
import { CartItemType } from "@/app/utils/Interfaces";

export const POST = async (request: NextRequest) => {
  const cart = await request.json();

  const token = request.headers.get("authorization");
  if (token === null || token === "") {
    return NextResponse.json(
      { message: "Unauthorized Access." },
      { status: 401 }
    );
  }

  let isTokenValid;
  try {
    isTokenValid = await firebaseAdmin
      .auth()
      .verifyIdToken(extractedToken(token));
  } catch (error) {
    if (error instanceof FirebaseAuthError) {
      const message = error.code.split("/")[1].replaceAll("-", " ");
      return NextResponse.json(
        { message: `Unauthorized Access. Due to ${message}.` },
        { status: 401 }
      );
    } else {
      return NextResponse.json(
        { message: "Unauthorized Access. Due to token expiration." },
        { status: 401 }
      );
    }
  }

  let user;
  try {
    user = await prisma.user.findUnique({
      where: {
        fireBaseId: isTokenValid.uid,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "user didn't exist. Please contact customer support." },
        { status: 404 }
      );
    }

    let isCartIemExisted = await prisma.cartItem.findFirst({
      where: {
        userId: isTokenValid.uid,
        id: cart.id,
        size: cart.size,
      },
    });

    console.log(isCartIemExisted);

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
          userId: isTokenValid.uid,
          id: cart.id,
          size: cart.size,
          quantity: cart.quantity,
        },
      });
    }
  } catch (error) {
    console.error("Prisma error:", error);
    return NextResponse.json(
      { message: "Server internal issue. Please try again." },
      { status: 500 }
    );
  }

  let userCart: CartItemType[] | [];
  try {
    userCart = await prisma.cartItem.findMany({
      where: {
        userId: isTokenValid.uid,
      },
      select: {
        id: true,
        size: true,
        quantity: true,
      },
    });

    if (userCart.length === 0) {
      userCart = [];
    }
  } catch (error) {
    console.error("Prisma error:", error);
    return NextResponse.json(
      { message: "Server internal issue. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json(userCart);
};

export const DELETE = () => {};

export const GET = async (request: NextRequest) => {
  const token = request.headers.get("authorization");
  if (token === null || token === "") {
    return NextResponse.json(
      { message: "Unauthorized Access." },
      { status: 401 }
    );
  }

  let user;
  try {
    user = await firebaseAdmin.auth().verifyIdToken(extractedToken(token));
  } catch (error) {
    if (error instanceof FirebaseAuthError) {
      const message = error.code.split("/")[1].replaceAll("-", " ");
      return NextResponse.json(
        { message: `Unauthorized Access. Due to ${message}.` },
        { status: 401 }
      );
    } else {
      return NextResponse.json(
        { message: "Unauthorized Access. Due to token expiration." },
        { status: 401 }
      );
    }
  }

  let cartLIst;
  try {
    cartLIst = await prisma.cartItem.findMany({
      where: {
        userId: user.uid,
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
