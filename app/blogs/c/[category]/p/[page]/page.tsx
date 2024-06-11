import BlogCart from "@/app/UIElements/BlogCart";
import Pagination from "@/app/components/Pagination";
import FilterBar from "@/app/components/SortAndSearchBar/FilterBar";
import SortAndSearchBar from "@/app/components/SortAndSearchBar/SortAndSearchBar";
import React from "react";

const page = ({
  params: { category, page },
}: {
  params: { category: string; page: string };
}) => {
  return (
    <main className="container pt-24  mx-auto px-6 sm:px-8 lg:px-14 sm:pt-32 lg:pt-40">
      <h1 className="text-[32px] font-bold text-center sm:text-5xl lg:text-6xl">
        Category: {category} {page}
      </h1>
      <FilterBar />
      <SortAndSearchBar />
      <div className="max-w-72 mx-auto grid grid-cols-1 gap-4 mt-5 sm:max-w-[680px] sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 sm:mt-8 lg:max-w-full lg:grid-cols-4">
        <BlogCart />
        <BlogCart />
        <BlogCart />
        <BlogCart />
        <BlogCart />
        <BlogCart />
        <BlogCart />
        <BlogCart />
        <BlogCart />
        <BlogCart />
        <BlogCart />
        <BlogCart />
      </div>
      <Pagination baseURL={`blogs/c/${category}/p/`} current={Number(page)} />
    </main>
  );
};

export default page;
