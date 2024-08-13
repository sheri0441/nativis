"use client";
import CategoryFilterTab from "@/app/UIElements/Miscellaneous/CategoryFilterTab";
import { ArrowIcon } from "@/app/utils/Icons";
import { categoriesType } from "@/app/utils/Interfaces";
import { usePathname } from "next/navigation";
import React from "react";

const CategoryBar = ({ categories }: { categories: categoriesType[] }) => {
  const pathname = usePathname();

  const scrollLeft = () => {
    const filterBar = document.getElementById("filterBar");

    filterBar!.scrollLeft -= filterBar!.offsetWidth / 2;
  };
  const scrollRight = () => {
    const filterBar = document.getElementById("filterBar");
    filterBar!.scrollLeft += filterBar!.offsetWidth / 2;
  };

  return (
    <div className="relative mt-3 sm:mt-4 lg:mt-6" id="filterBarContainer">
      <div
        className={`absolute top-1/2 left-0 -translate-y-1/2 w-9 h-full bg-gradient-to-r from-neutral hidden sm:flex items-center z-10`}
      >
        <button
          className="group  w-6 aspect-square p-1 bg-secondary bg-opacity-20 rounded-full hover:bg-opacity-50"
          onClick={scrollLeft}
        >
          <ArrowIcon style="fill-primary group-hover:fill-neutral" />
        </button>
      </div>
      <div
        className={`flex flex-shrink-0 flex-wrap gap-2  sm:flex-nowrap sm:overflow-x-hidden justify-center sm:justify-start sm:px-7`}
        id="filterBar"
      >
        <CategoryFilterTab
          name="all"
          url="/p/1"
          checkCategory={
            pathname.includes("products/p") || pathname.includes("blogs/p")
          }
        />

        {categories &&
          categories.map((category) => (
            <CategoryFilterTab
              key={category.name}
              url={`/c/${category.name.toLowerCase().replaceAll(" ", "-")}/p/1`}
              checkCategory={
                pathname.split("/")[3] ===
                category.name.toLowerCase().replaceAll(" ", "-")
              }
              name={category.name}
            />
          ))}
      </div>
      <div
        className={`hidden sm:flex items-center absolute top-1/2 right-0 -translate-y-1/2 bg-gradient-to-l from-neutral w-9 h-full   z-10`}
      >
        <button
          className="group w-6 aspect-square p-1 bg-secondary bg-opacity-20 rounded-full rotate-180 hover:bg-opacity-50 block ml-auto"
          onClick={scrollRight}
        >
          <ArrowIcon style="fill-primary group-hover:fill-neutral" />
        </button>
      </div>
    </div>
  );
};

export default CategoryBar;
