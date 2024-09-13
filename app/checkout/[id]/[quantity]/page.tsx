import { Metadata } from "next";
import React from "react";
import PageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Checkout | Nativis",
  description: "Finalize your products and order it here",
};

const page = ({
  params: { id, quantity },
}: {
  params: { id: string; quantity: string };
}) => {
  return <PageContent id={id} quantity={quantity} />;
};

export default page;
