import React from "react";
import FilterBar from "./FilterBar";
import SortBy from "./SortBy";
import SearchOption from "./SearchOption";

const page = () => {
  return (
    <main className="container pt-24 px-6 mx-auto sm:px-0 sm:pt-32 lg:pt-40">
      <h1 className="text-[32px] font-bold text-center sm:text-5xl lg:text-6xl">
        Blogs
      </h1>
      <FilterBar />
      <div className="mt-5 sm:mt-8">
        <SortBy />
        <SearchOption />
      </div>
    </main>
  );
};

export default page;
