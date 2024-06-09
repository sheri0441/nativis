"use client";
import React from "react";
import BlogCart from "../UIElements/BlogCart";
import Pagination from "../components/Pagination";
import FilterBar from "../components/SortAndSearchBar/FilterBar";
import SortAndSearchBar from "../components/SortAndSearchBar/SortAndSearchBar";
import { useSearchParams } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");
  const page = searchParams.get("page");

  return (
    <main className="container pt-24  mx-auto px-6 sm:px-8 lg:px-14 sm:pt-32 lg:pt-40">
      <h1 className="text-[32px] font-bold text-center sm:text-5xl lg:text-6xl">
        Blogs
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
      <Pagination />
    </main>
  );
};

export default page;
