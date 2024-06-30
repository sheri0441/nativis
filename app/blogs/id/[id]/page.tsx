import React from "react";
import { Metadata } from "next";
import RichTextRenderer from "../../../components/RichTextRenderer";
import RecommendedBlogsAndProducts from "./RecommendedBlogsAndProducts";
import CommentSection from "./CommentSection";
import LikeAndShare from "./LikeAndShare";
import BlogBanner from "./BlogBanner";
import data from "./sample.json";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: ` ${data.title} | Blogs`,
    description: data.title,
  };
}

const page = ({ params: { id } }: { params: { id: string } }) => {
  console.log(id);

  return (
    <main>
      <BlogBanner
        main_image={data.main_image}
        title={data.title}
        date={data.date}
        category={data.category}
      />
      <div className={`container mx-auto lg:max-w-[872px] text-primary  `}>
        <RichTextRenderer content={data.content} />
        <LikeAndShare />
        <CommentSection comments={data.comments} />
      </div>
      <RecommendedBlogsAndProducts />
    </main>
  );
};

export default page;
