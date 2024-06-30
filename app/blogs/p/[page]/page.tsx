import React from "react";
import { Metadata } from "next";
import BlogCard from "@/app/UIElements/Card/BlogCard";
import MainTag from "@/app/UIElements/Miscellaneous/MainTag";
import PageTitle from "@/app/UIElements/Miscellaneous/PageTitle";
import Pagination from "@/app/components/Pagination";
import FilterBar from "@/app/components/SortAndSearchBar/FilterBar";
import SortAndSearchBar from "@/app/components/SortAndSearchBar/SortAndSearchBar";

export const metadata: Metadata = {
  title: "Blogs | Nativis",
  description: "Thousand of Blogs to get education about your self",
};

const page = ({ params: { page } }: { params: { page: string } }) => {
  return (
    <MainTag>
      <PageTitle>Blogs</PageTitle>
      <FilterBar />
      <SortAndSearchBar />
      <div className="max-w-72 mx-auto grid grid-cols-1 gap-4 mt-5 sm:max-w-[680px] sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 sm:mt-8 lg:max-w-full lg:grid-cols-4">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
      <Pagination baseURL={`/blogs/p/`} current={Number(page)} />
    </MainTag>
  );
};

export default page;
