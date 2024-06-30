import { redirect } from "next/navigation";

const page = ({ params: { category } }: { params: { category: string } }) => {
  redirect(`/products/c/${category}/p/1`);
};

export default page;
