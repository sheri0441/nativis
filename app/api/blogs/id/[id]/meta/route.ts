import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  context: { params: { id: string } }
) => {
  const { id } = context.params;

  let blogMeta;

  try {
    blogMeta = await prisma.blog.findFirst({
      where: {
        id: id,
      },
      select: {
        title: true,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "there is some error in server" },
      { status: 500 }
    );
  }

  return NextResponse.json(blogMeta);
};
