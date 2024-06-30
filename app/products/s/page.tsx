import { redirect } from "next/navigation";

const page = () => {
  redirect(`/products/p/1`);
};

export default page;
