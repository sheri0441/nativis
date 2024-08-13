import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { fetchProductsCard } from "./util/products/FetchProductsCard";
import { fetchBlogsCard } from "./util/blogs/FetchBlogsCard";

export const GET = async ({ request }: { request: NextRequest }) => {
  let products, blogs;

  try {
    products = await fetchProductsCard({
      listLength: 4,
      order: {
        created_at: "asc",
      },
    });

    blogs = await fetchBlogsCard({
      listLength: 4,
      order: {
        createdAt: "asc",
      },
    });
  } catch (error) {
    return NextResponse.error();
  }

  // add condition to check if user is login and have already like the blog

  return NextResponse.json({ products, blogs });
};
