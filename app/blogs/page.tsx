import React from "react";
import { Metadata } from "next";
import PageTitle from "../UIElements/Miscellaneous/PageTitle";
import MainTag from "../UIElements/Miscellaneous/MainTag";
import BlogCard from "../UIElements/Card/BlogCard";
import Pagination from "../components/Pagination";
import FilterBar from "../components/SortAndSearchBar/CategoryBar";
import SortAndSearchBar from "../components/SortAndSearchBar/SortAndSearchBar";

export const metadata: Metadata = {
  title: "Blogs | Nativis",
  description: "Thousand of Blogs to get education about your self",
};

const page = () => {
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
      <Pagination baseURL="blogs/p/" current={1} />
    </MainTag>
  );
};

export default page;
