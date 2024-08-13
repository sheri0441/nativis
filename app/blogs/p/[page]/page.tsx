import React from "react";
import { Metadata } from "next";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Blogs | Nativis",
  description: "Thousand of Blogs to get education about your self",
};

const page = ({ params: { page } }: { params: { page: string } }) => {
  return <PageContent page={page} />;
};

export default page;
