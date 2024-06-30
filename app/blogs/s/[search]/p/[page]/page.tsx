import React from "react";
import BlogCard from "@/app/UIElements/Card/BlogCard";
import MainTag from "@/app/UIElements/Miscellaneous/MainTag";
import PageTitle from "@/app/UIElements/Miscellaneous/PageTitle";
import Pagination from "@/app/components/Pagination";
import FilterBar from "@/app/components/SortAndSearchBar/FilterBar";
import SortAndSearchBar from "@/app/components/SortAndSearchBar/SortAndSearchBar";

const page = ({
  params: { page, search },
}: {
  params: { page: string; search: string };
}) => {
  return (
    <MainTag>
      <PageTitle>
        Search: {search} {page}
      </PageTitle>
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
      <Pagination baseURL={`/blogs/s/${search}/p/`} current={Number(page)} />
    </MainTag>
  );
};

export default page;