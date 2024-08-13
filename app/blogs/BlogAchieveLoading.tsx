import React from "react";
import SortAndSearchBarLoading from "../components/SortAndSearchBar/SortAndSearchBarLoading";
import CategoryLoadingBar from "../components/SortAndSearchBar/CategoryLoadingBar";
import BlogCardLoadingGrid from "./BlogCardLoadingGrid";

const BlogAchieveLoading = ({
  pageTitle,
  hideCategory = false,
}: {
  pageTitle: string;
  hideCategory?: boolean;
}) => {
  return (
    <main className="container pt-24  mx-auto px-6 sm:px-8 lg:px-14 sm:pt-32 lg:pt-40">
      <h1 className="text-[32px] font-bold text-center sm:text-5xl lg:text-6xl text-primary capitalize">
        {pageTitle}
      </h1>
      {!hideCategory && <CategoryLoadingBar />}
      <SortAndSearchBarLoading />
      <BlogCardLoadingGrid />
      <div className="flex items-center gap-6 w-fit mx-auto mt-11 sm:mt-16">
        <div className=" w-10 aspect-square bg-primary bg-opacity-50 rounded-full  p-3"></div>
        <div
          className={`block relative w-8 animate-bgPulse aspect-square rounded-full overflow-hidden`}
        ></div>
        <div
          className={`block relative w-8 animate-bgPulseAlter aspect-square rounded-full overflow-hidden`}
        ></div>
        <div
          className={`block relative w-8 animate-bgPulse aspect-square rounded-full overflow-hidden`}
        ></div>

        <div className=" w-10 aspect-square bg-primary bg-opacity-50 rounded-full  p-3"></div>
      </div>
    </main>
  );
};

export default BlogAchieveLoading;
