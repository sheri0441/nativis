import { auth } from "@/app/firebase";
import { prisma } from "@/prisma/prisma";
import { retry } from "@reduxjs/toolkit/query";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();

  if (email.length === 0 || password.length === 0) {
    return NextResponse.json(
      { message: "Please provide your email and password." },
      { status: 401 }
    );
  }

  let user;
  try {
    user = await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error instanceof FirebaseError) {
      const text = error.code.split("/")[1].replaceAll("-", " ");
      return NextResponse.json({ message: text }, { status: 401 });
    } else {
      return NextResponse.json(
        { message: "There is some internal issues. Please try again." },
        { status: 500 }
      );
    }
  }

  const token = await user.user.getIdToken();

  let userData;
  try {
    userData = await prisma.user.findFirst({
      where: {
        fireBaseId: user.user.uid,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "There is some internal issues. Please try again." },
      { status: 500 }
    );
  }

  if (!userData) {
    return NextResponse.json(
      {
        message:
          "There is some issues related to your account. Please connect our customer support.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    name: userData.name,
    email: userData.email,
    image: userData.image,
    id: userData.id,
    provider: userData.providerId,
    token,
  });
};
