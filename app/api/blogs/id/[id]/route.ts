import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { randomFourBlogsCard } from "@/app/api/util/blogs/RandomFourBlogsCard";
import { randomFourProductsCard } from "@/app/api/util/misc/RandomFourProductsCard";
import {
  countBlogComments,
  getBlogCommentsDetail,
  getCommentListWithUserDetail,
  getFiveComments,
} from "@/app/api/api-lib";

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
    return NextResponse.json(
      { message: "There is some error in the server. Please try again." },
      { status: 500 }
    );
  }

  const { BlogCommentsDetail, BlogCommentsError } = await getBlogCommentsDetail(
    blog.id,
    1
  );

  if (BlogCommentsError) {
    return NextResponse.json(
      { message: "There is some error in the server. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    main: blog,
    otherBlog: otherBlog,
    products: products,
    comments: BlogCommentsDetail,
  });
};
