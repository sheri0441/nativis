import React from "react";
import CategoryBar from "../components/SortAndSearchBar/CategoryBar";
import SortAndSearchBar from "../components/SortAndSearchBar/SortAndSearchBar";
import Pagination from "../components/Pagination";
import { BlogCardType, BlogPageData } from "../utils/Interfaces";
import BlogCard from "../UIElements/Card/BlogCard";

const BlogAchieveLayout = ({
  data,
  pageTitle,
  paginationURL,
  hideCategory = false,
}: {
  data: BlogPageData;
  pageTitle: string;
  paginationURL: string;
  hideCategory?: boolean;
}) => {
  return (
    <main className="container pt-24  mx-auto px-6 sm:px-8 lg:px-14 sm:pt-32 lg:pt-40">
      <h1 className="text-[32px] font-bold text-center sm:text-5xl lg:text-6xl text-primary capitalize">
        {pageTitle}
      </h1>
      {!hideCategory && <CategoryBar categories={data.categories} />}
      <SortAndSearchBar
        baseResultPageURL="/blogs/id/"
        baseSearchURL="/api/blogs/search/"
      />

      {data.blogs.length > 0 ? (
        <div className="max-w-72 mx-auto grid grid-cols-1 gap-4 mt-5 sm:max-w-[680px] sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 sm:mt-8 lg:max-w-full lg:grid-cols-4">
          {data.blogs.map((blog: BlogCardType) => {
            return <BlogCard blog={blog} key={blog.id} />;
          })}
        </div>
      ) : (
        <p className="text-xl text-center mt-20 mb-20">Blogs not found</p>
      )}

      <Pagination
        baseURL={paginationURL}
        current={data.current}
        maximum={data.total}
      />
    </main>
  );
};

export default BlogAchieveLayout;
