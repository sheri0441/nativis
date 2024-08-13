import { NextRequest, NextResponse } from "next/server";
import { firebaseAdmin } from "../firebase_admin";
import { FirebaseAuthError } from "firebase-admin/auth";
import { prisma } from "@/prisma/prisma";

export const GET = async (request: NextRequest) => {
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
    user = await prisma.user.findFirst({
      where: {
        fireBaseId: isTokenValid.uid,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Server internal issue." },
      { status: 500 }
    );
  }

  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized Access. Due to token expiration." },
      { status: 401 }
    );
  }

  return NextResponse.json({
    name: user.name,
    image: user.image,
    id: user.id,
    email: user.email,
    provider: user.providerId,
    cart: user.cart,
    token,
  });
};
