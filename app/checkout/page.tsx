import { Metadata } from "next";
import React from "react";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Checkout | Nativis",
  description: "Finalize your products and order it here",
};

const page = () => {
  return <PageContent />;
};

export default page;
