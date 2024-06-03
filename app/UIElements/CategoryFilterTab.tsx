import Link from "next/link";
import React from "react";

const CategoryFilterTab = () => {
  return (
    <div>
      <Link
        href="/"
        className="text-[10px] sm:text-base px-3 sm:px-4 py-1 sm:py-2 border border-primary rounded-full hover:bg-primary hover:text-neutral transition-colors duration-500 ease-in-out"
      >
        All <span className="font-light">(10)</span>
      </Link>
    </div>
  );
};

export default CategoryFilterTab;
