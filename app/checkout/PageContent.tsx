"use client";
import React from "react";
import { useAppSelector } from "../app/hookes";
import CheckoutLayout from "./CheckoutLayout";

const PageContent = () => {
  const { cart, cartLoading } = useAppSelector((store) => store.cart);

  return <CheckoutLayout cart={cart} cartLoading={cartLoading} />;
};

export default PageContent;
