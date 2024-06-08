"use client";
import React, { useEffect, useState } from "react";
import { ArrowIcon } from "../UIElements/Icons";
import { color } from "../UIElements/colors";
import CategoryFilterTab from "../UIElements/CategoryFilterTab";

const FilterBar = () => {
  const [showScrollArrow, setShowScrollArrow] = useState<boolean>(false);

  const scrollLeft = () => {
    const filterBar = document.getElementById("filterBar");

    filterBar!.scrollLeft -= filterBar!.offsetWidth / 2;
  };
  const scrollRight = () => {
    const filterBar = document.getElementById("filterBar");
    filterBar!.scrollLeft += filterBar!.offsetWidth / 2;
  };

  useEffect(() => {
    const filterBar = document.getElementById("filterBar");
    if (filterBar!.scrollWidth > filterBar!.offsetWidth) {
      setShowScrollArrow((pervState) => (pervState = true));
    }
  }, []);
  return (
    <div className="relative mt-3 sm:mt-4 lg:mt-6" id="filterBarContainer">
      <div
        className={`absolute top-1/2 left-0 -translate-y-1/2 w-9 h-full bg-gradient-to-r from-neutral hidden ${
          showScrollArrow ? " sm:flex" : ""
        } items-center z-10`}
      >
        <button
          className=" w-6 aspect-square p-1 bg-secondary bg-opacity-20 rounded-full hover:bg-opacity-50"
          onClick={scrollLeft}
        >
          <ArrowIcon fill={color.primary} />
        </button>
      </div>
      <div
        className={`flex flex-shrink-0 flex-wrap gap-2  sm:flex-nowrap sm:overflow-x-hidden justify-center sm:justify-start  ${
          showScrollArrow ? "sm:px-7" : ""
        }`}
        id="filterBar"
      >
        <CategoryFilterTab />
        <CategoryFilterTab />
        <CategoryFilterTab />
        <CategoryFilterTab />
        <CategoryFilterTab />
        <CategoryFilterTab />
        <CategoryFilterTab />
        <CategoryFilterTab />
      </div>
      <div
        className={`hidden ${
          showScrollArrow ? " sm:flex" : ""
        } items-center absolute top-1/2 right-0 -translate-y-1/2 bg-gradient-to-l from-neutral w-9 h-full   z-10`}
      >
        <button
          className="w-6 aspect-square p-1 bg-secondary bg-opacity-20 rounded-full rotate-180 hover:bg-opacity-50 block ml-auto"
          onClick={scrollRight}
        >
          <ArrowIcon fill={color.primary} />
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
