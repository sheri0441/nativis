import { NextRequest, NextResponse } from "next/server";
import { firebaseAdmin } from "../firebase_admin";
import { FirebaseAuthError } from "firebase-admin/auth";
import { prisma } from "@/prisma/prisma";
import { JsonArray } from "@prisma/client/runtime/library";

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
    isTokenValid = await firebaseAdmin.auth().verifyIdToken(token);
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
      select: {
        cart: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "user didn't exist" },
        { status: 404 }
      );
    }

    let updateCart;
    if (user!.cart !== null) {
      updateCart = [...cart, ...(user!.cart as JsonArray)];
    } else {
      updateCart = cart;
    }

    user = await prisma.user.update({
      where: {
        fireBaseId: isTokenValid.uid,
      },
      data: {
        cart: updateCart,
      },
    });

    console.log(user);
  } catch (error) {
    return NextResponse.json(
      { message: "Server internal issue. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json(user.cart);
};

export const DELETE = () => {};
