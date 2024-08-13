import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  blogId: string;
  userId: string;
};

export const POST = async (
  request: NextRequest,
  context: { params: Params }
) => {
  const { blogId, userId } = context.params;

  let isBlogExist, isUserExist;

  try {
    isBlogExist = await prisma.blog.count({ where: { id: blogId } });
    isUserExist = await prisma.user.count({ where: { id: userId } });

    if (isBlogExist && isUserExist) {
      await prisma.likes.create({
        data: {
          blogId: blogId,
          userId: userId,
        },
      });

      await prisma.blog.update({
        where: { id: blogId },
        data: {
          likes: { increment: 1 },
        },
      });
    } else {
      return NextResponse.json(
        { message: "Blog or user not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }

  return NextResponse.json({ message: "Done!" });
};

export const DELETE = async (
  request: NextRequest,
  context: { params: Params }
) => {
  const { blogId, userId } = context.params;

  let isLikeExist;

  try {
    isLikeExist = await prisma.likes.findFirst({
      where: { blogId: blogId, userId: userId },
    });

    if (isLikeExist) {
      await prisma.likes.delete({
        where: { id: isLikeExist.id },
      });

      await prisma.blog.update({
        where: { id: blogId },
        data: {
          likes: { decrement: 1 },
        },
      });
    } else {
      return NextResponse.json(
        { message: "Blog or user not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.error();
  }

  return NextResponse.json({ message: "Done!" });
};
