import {
  checkBlogExist,
  getLike,
  getUserFromFirebase,
  getUserPrismaId,
} from "@/app/api/api-lib";
import { prisma } from "@/prisma/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  context: { params: { blogId: string } }
) => {
  const token = headers().get("authorization");

  const { validUser, error } = await getUserFromFirebase(token);

  if (error.hasError) {
    return NextResponse.json(
      { message: "Authorization failed" },
      { status: 400 }
    );
  }

  const { blogId } = context.params;

  const isBlogExist = await checkBlogExist(blogId);

  if (!isBlogExist) {
    return NextResponse.json({ message: "Blog not found" }, { status: 404 });
  }

  const { id, userPrismaError } = await getUserPrismaId(validUser.uid);

  if (userPrismaError) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const { like, hasError } = await getLike({ userId: id, blogId });

  if (!hasError && like.id) {
    return NextResponse.json(
      { message: "You have liked this blog" },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { message: "You don't have liked this blog" },
      { status: 400 }
    );
  }
};

export const PATCH = async (
  request: NextRequest,
  context: { params: { blogId: string } }
) => {
  const { blogId } = context.params;

  const isBlogExist = await checkBlogExist(blogId);

  if (!isBlogExist) {
    return NextResponse.json({ message: "Blog not found" }, { status: 404 });
  }

  const token = headers().get("authorization");

  const { validUser, error } = await getUserFromFirebase(token);

  if (error.hasError) {
    const errorMessage = error.text;
  }

  const { id, userPrismaError } = await getUserPrismaId(validUser.uid);

  if (userPrismaError) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const { like, hasError } = await getLike({ userId: id, blogId });

  let blog;

  if (like.id && !hasError) {
    try {
      await prisma.likes.delete({
        where: {
          id: like.id,
        },
      });

      blog = await prisma.blog.update({
        where: {
          id: blogId,
        },
        data: {
          likes: {
            decrement: 1,
          },
        },
        select: {
          likes: true,
        },
      });
    } catch (error) {
      return NextResponse.json(
        { message: "There is some issue in server." },
        { status: 500 }
      );
    }

    return NextResponse.json({ blogLike: blog.likes }, { status: 200 });
  } else {
    try {
      await prisma.likes.create({
        data: {
          userId: id,
          blogId: blogId,
        },
      });

      blog = await prisma.blog.update({
        where: {
          id: blogId,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
        select: {
          likes: true,
        },
      });
    } catch (error) {
      return NextResponse.json(
        { message: "There is some issue in server." },
        { status: 500 }
      );
    }
    return NextResponse.json({ blogLike: blog.likes }, { status: 201 });
  }
};
