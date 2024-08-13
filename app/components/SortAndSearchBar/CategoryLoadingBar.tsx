import React from "react";
import CategoryLoading from "./CategoryLoading";

const CategoryLoadingBar = () => {
  return (
    <div className="relative mt-3 sm:mt-4 lg:mt-6" id="filterBarContainer">
      <div
        className={`absolute top-1/2 left-0 -translate-y-1/2 w-9 h-full bg-gradient-to-r from-neutral hidden sm:flex items-center z-10`}
      >
        <div className="group  w-6 aspect-square p-1 bg-secondary bg-opacity-20 rounded-full "></div>
      </div>
      <div
        className={`flex flex-shrink-0 flex-wrap gap-2  sm:flex-nowrap sm:overflow-x-hidden justify-center sm:justify-start sm:px-7  odd:*:animate-bgPulseAlter even:*:animate-bgPulse`}
        id="filterBar"
      >
        <CategoryLoading />
        <CategoryLoading />
        <CategoryLoading />
        <CategoryLoading />
        <CategoryLoading />
        <CategoryLoading />
        <CategoryLoading />
      </div>
      <div
        className={`hidden sm:flex items-center absolute top-1/2 right-0 -translate-y-1/2 bg-gradient-to-l from-neutral w-9 h-full   z-10`}
      >
        <div className="group w-6 aspect-square p-1 bg-secondary bg-opacity-20 rounded-full rotate-180  block ml-auto"></div>
      </div>
    </div>
  );
};

export default CategoryLoadingBar;
