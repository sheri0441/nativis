import React from "react";
import BlogCardLoading from "../UIElements/Card/BlogCardLoading";

const BlogCardLoadingGrid = () => {
  return (
    <div className="max-w-72 mx-auto grid grid-cols-1 gap-4 mt-5 sm:max-w-[680px] sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 sm:mt-8 lg:max-w-full lg:grid-cols-4 even:*:animate-bgPulse odd:*:animate-bgPulseAlter">
      <BlogCardLoading />
      <BlogCardLoading />
      <BlogCardLoading />
      <BlogCardLoading />
      <BlogCardLoading />
      <BlogCardLoading />
      <BlogCardLoading />
      <BlogCardLoading />
      <BlogCardLoading />
      <BlogCardLoading />
      <BlogCardLoading />
      <BlogCardLoading />
    </div>
  );
};

export default BlogCardLoadingGrid;
