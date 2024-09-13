import {
  checkBlogExist,
  getBlogCommentsDetail,
  getUserFromFirebase,
  getUserPrismaId,
} from "@/app/api/api-lib";
import { prisma } from "@/prisma/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  context: { params: { blogId: string; pair: string } }
) => {
  const { blogId, pair } = context.params;
  const pairNumber: number = Number(pair) || 1;

  const isBlogExist = await checkBlogExist(blogId);

  if (!isBlogExist) {
    return NextResponse.json(
      { message: "Blog doesn't exist." },
      { status: 404 }
    );
  }

  const { BlogCommentsDetail, BlogCommentsError } = await getBlogCommentsDetail(
    blogId,
    pairNumber
  );

  if (BlogCommentsError) {
    return NextResponse.json(
      { message: "There is some error in the server. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json(BlogCommentsDetail);
};

export const POST = async (
  request: NextRequest,
  context: {
    params: {
      blogId: string;
      pair: string;
    };
  }
) => {
  const { blogId, pair } = context.params;
  const pairNumber: number = Number(pair) || 1;
  const isBlogExist = checkBlogExist(blogId);

  if (!isBlogExist) {
    return NextResponse.json(
      { message: "Such Blog doesn't exit." },
      { status: 404 }
    );
  }

  const token = headers().get("authorization");

  const { validUser, error } = await getUserFromFirebase(token);

  if (error.hasError === true) {
    return NextResponse.json(
      { message: "Authorization issue." },
      { status: 401 }
    );
  }

  const { id, userPrismaError } = await getUserPrismaId(validUser.uid);

  if (userPrismaError) {
    return NextResponse.json(
      { message: "There is some issue in the server. Please try again." },
      { status: 500 }
    );
  }

  const body = await request.json();

  const { comment } = body;

  if (comment.length === 0 || comment.length > 100) {
    return NextResponse.json(
      { message: "Comment must be between 1 and 100 characters" },
      { status: 500 }
    );
  }

  try {
    await prisma.comment.create({
      data: {
        blogId: blogId,
        userId: id,
        content: comment,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "There is some issue in the server. Please try again." },
      { status: 500 }
    );
  }

  const { BlogCommentsDetail, BlogCommentsError } = await getBlogCommentsDetail(
    blogId,
    pairNumber
  );

  if (BlogCommentsError) {
    return NextResponse.json(
      { message: "There is some issue in the server. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json(BlogCommentsDetail, { status: 201 });
};
