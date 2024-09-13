import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  let faqList;
  try {
    faqList = await prisma.fAQ.findMany();
  } catch (error) {
    return NextResponse.json(
      { message: "There is some issue in the server. Please try again." },
      { status: 500 }
    );
  }

  if (!faqList) {
    return NextResponse.json(
      { message: "Unable to find faq. Please contact support team" },
      { status: 404 }
    );
  }

  return NextResponse.json(faqList);
};
