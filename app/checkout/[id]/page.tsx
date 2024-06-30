import { redirect } from "next/navigation";

const page = ({ params: { id } }: { params: { id: string } }) => {
  redirect(`/checkout/${id}/1`);
};

export default page;
