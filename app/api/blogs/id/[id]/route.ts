import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { randomFourBlogsCard } from "@/app/api/util/blogs/RandomFourBlogsCard";
import { randomFourProductsCard } from "@/app/api/util/misc/RandomFourProductsCard";

type Params = {
  id: string;
};

export const GET = async (
  request: NextRequest,
  context: { params: Params }
) => {
  let id = context.params.id;
  let blog, otherBlog, products;

  try {
    blog = await prisma.blog.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        content: true,
        title: true,
        createdAt: true,
        category: true,
        main_image: true,
        likes: true,
      },
    });

    if (!blog) {
      return NextResponse.json({ message: "No blogs found" }, { status: 404 });
    }

    products = await randomFourProductsCard();

    otherBlog = await randomFourBlogsCard({
      NOT: {
        category: { equals: blog.category, mode: "insensitive" },
      },
    });
  } catch (error) {
    return NextResponse.error();
  }

  return NextResponse.json({
    mainBlog: blog,
    otherBlog: otherBlog,
    products: products,
  });
};
