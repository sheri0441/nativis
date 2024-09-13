import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  context: { params: { pageName: string } }
) => {
  const { pageName } = context.params;

  let pageMeta;
  try {
    pageMeta = await prisma.staticPages.findFirst({
      where: {
        title: pageName,
      },
      select: {
        title: true,
        meta: true,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "There is some error in the server.Please try again." },
      { status: 500 }
    );
  }

  if (!pageMeta) {
    return NextResponse.json(
      { message: "Such page doesn't exist." },
      { status: 404 }
    );
  }

  return NextResponse.json(pageMeta);
};
