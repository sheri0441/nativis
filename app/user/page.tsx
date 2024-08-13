import { Metadata } from "next";
import PageContent from "./pageContent";

export const metadata: Metadata = {
  title: "Profile | Nativis",
  description: "Thousand of Blogs to get education about your self",
};

const page = () => {
  return <PageContent />;
};

export default page;
