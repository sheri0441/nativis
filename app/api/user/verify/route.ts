import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { getUserFromFirebase } from "../../api-lib";

export const GET = async (request: NextRequest) => {
  const token = request.headers.get("authorization");

  const { validUser, error } = await getUserFromFirebase(token);

  if (error.hasError) {
    const errorMessage = error.text;
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }

  let user;
  try {
    user = await prisma.user.findFirst({
      where: {
        fireBaseId: validUser.uid,
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
    token,
  });
};
