"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import CheckoutLayout from "../../CheckoutLayout";

const PageContent = ({ id, quantity }: { id: string; quantity: string }) => {
  const searchParams = useSearchParams();
  const size = searchParams.get("size");

  const cart = { id, quantity: Number(quantity), size };
  return (
    <CheckoutLayout cart={[cart]} cartLoading={false} disableDelete={true} />
  );
};

export default PageContent;
