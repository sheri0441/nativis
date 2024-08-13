import React from "react";
import { Metadata } from "next";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Products | Nativis",
  description: "Our Neem based products that are good for you skin.",
};

const page = async ({ params: { page } }: { params: { page: string } }) => {
  return <PageContent page={page} />;
};

export default page;
