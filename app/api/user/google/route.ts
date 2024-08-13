import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { googleSchema } from "../../util/schema";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  let validBody;
  try {
    validBody = googleSchema.parse(body);
  } catch (error) {
    return NextResponse.json(
      { message: "There is validation error." },
      { status: 409 }
    );
  }

  const { name, email, image, provider, id } = validBody;

  let user;

  try {
    user = await prisma.user.findFirst({
      where: {
        fireBaseId: id,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "there is some error pease try again." },
      {
        status: 500,
      }
    );
  }

  if (user) {
    if (user.image === image) {
      return NextResponse.json({
        name: user.name,
        email: user.email,
        cart: user.cart,
        id: user.id,
        image: user.image,
        provider: user.providerId,
      });
    } else {
      const userUpdate = await prisma.user.update({
        where: {
          fireBaseId: id,
        },
        data: {
          image: image,
        },
      });
      return NextResponse.json({
        name: userUpdate.name,
        email: userUpdate.email,
        cart: userUpdate.cart,
        id: userUpdate.id,
        image: userUpdate.image,
        provider: userUpdate.providerId,
      });
    }
  } else {
    const userCreate = await prisma.user.create({
      data: {
        name: name,
        email: email,
        image: image,
        fireBaseId: id,
        providerId: provider,
      },
    });

    return NextResponse.json({
      name: userCreate.name,
      email: userCreate.email,
      image: userCreate.image,
      id: userCreate.id,
      provider: userCreate.providerId,
      cart: userCreate.cart,
    });
  }
};
