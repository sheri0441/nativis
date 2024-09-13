import React from "react";
import { Metadata } from "next";
import RichTextRenderer from "../../../components/RichTextRenderer";
import RecommendedBlogsAndProducts from "./RecommendedBlogsAndProducts";
import CommentSection from "./CommentSection";
import LikeAndShare from "./LikeAndShare";
import BlogBanner from "./BlogBanner";
import { axiosFetcher } from "@/app/UIElements/Miscellaneous/axiosFetcher";

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const url = process.env.BASE_URL + `/api/blogs/id/${id}/meta`;
  const blogMeta = await axiosFetcher(url);
  return {
    title: ` ${blogMeta.title} | Blogs`,
    description: blogMeta.title,
  };
}

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const url = process.env.BASE_URL + `/api/blogs/id/${id}`;
  const blogData = await axiosFetcher(url);
  return (
    <main>
      <BlogBanner
        main_image={blogData.main.main_image}
        title={blogData.main.title}
        date={blogData.main.createdAt}
        category={blogData.main.category}
      />
      <div className={`container mx-auto lg:max-w-[872px] text-primary pt-10 `}>
        <RichTextRenderer content={blogData.main.content} />
        <LikeAndShare
          likeNumber={blogData.main.likes}
          blogId={blogData.main.id}
        />
        <CommentSection id={id} comment={blogData.comments} />
      </div>
      <RecommendedBlogsAndProducts
        blogList={blogData.otherBlog}
        productList={blogData.products}
      />
    </main>
  );
};

export default page;
