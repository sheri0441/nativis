import Link from "next/link";
import React from "react";
import CategoryFilterTab from "../UIElements/CategoryFilterTab";
import { ArrowIcon } from "../UIElements/Icons";
import { color } from "../UIElements/colors";

const page = () => {
  return (
    <main className="container pt-24 px-6 mx-auto sm:px-0 sm:pt-32 lg:pt-40">
      <h1 className="text-[32px] font-bold text-center sm:text-5xl lg:text-6xl">
        Blogs
      </h1>
      <div className="relative">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-9 h-7 bg-gradient-to-r from-neutral ">
          <button className=" w-6 aspect-square p-1 bg-secondary bg-opacity-20 rounded-full hover:bg-opacity-50">
            <ArrowIcon fill={color.primary} />
          </button>
        </div>
        <div>
          <CategoryFilterTab />
        </div>
        <div>
          <button className="w-6 aspect-square p-1 bg-secondary bg-opacity-20 rounded-full rotate-180 hover:bg-opacity-50">
            <ArrowIcon fill={color.primary} />
          </button>
        </div>
      </div>
    </main>
  );
};

export default page;
