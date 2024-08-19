import { NextRequest, NextResponse } from "next/server";
import { firebaseAdmin } from "../../firebase_admin";
import { FirebaseAuthError } from "firebase-admin/auth";
import { prisma } from "@/prisma/prisma";
import { extractedToken } from "@/app/api/api-lib";

type Params = {
  id: string;
};

export const DELETE = async (
  request: NextRequest,
  context: { params: Params }
) => {
  let id = context.params.id;

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

  try {
    let cartItem = await prisma.cartItem.findFirst({
      where: {
        id: id,
        userId: isTokenValid.uid,
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
      userId: isTokenValid.uid,
    },
  });

  return NextResponse.json(cartList);
};
