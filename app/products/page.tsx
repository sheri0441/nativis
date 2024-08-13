import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Nativis | Products",
  description: `Get our neem based products that are good for your self`,
};

const page = () => {
  redirect(`/products/p/1`);
};

export default page;
