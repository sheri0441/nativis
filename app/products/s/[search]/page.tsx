import { redirect } from "next/navigation";

const page = ({ params: { search } }: { params: { search: string } }) => {
  redirect(`/products/s/${search}/p/1`);
};

export default page;
