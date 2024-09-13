import { NextRequest, NextResponse } from "next/server";
import { fetchProductsCard } from "./util/products/FetchProductsCard";
import { fetchBlogsCard } from "./util/blogs/FetchBlogsCard";
import { prisma } from "@/prisma/prisma";
import { contactForm } from "../utils/schema";
import { sendEmail } from "./api-lib";
import { Thankyou } from "../utils/emails/Thankyou";

export const GET = async (request: NextRequest) => {
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

  return NextResponse.json({ products, blogs });
};

export const POST = async (request: NextRequest) => {
  const { data } = await request.json();

  let validBody;
  try {
    validBody = contactForm.parse(data);
  } catch (error) {
    return NextResponse.json(
      { message: "The form is not valid" },
      { status: 401 }
    );
  }

  try {
    await prisma.contact.create({
      data: validBody,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "There is some issue in the server side. Try again." },
      { status: 500 }
    );
  }

  await sendEmail({
    subject: "Thank you for contact",
    to: validBody.email,
    body: Thankyou(),
  });

  return NextResponse.json({ status: 201 });
};
