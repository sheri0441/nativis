import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CategoryFilterTab = ({ category }: { category: string }) => {
  const pathname = usePathname();

  return (
    <Link
      href={
        `${pathname.includes("products") ? "/products" : "/blogs"}` +
        `/c/${category}/p/1`
      }
      className="text-sm sm:text-base px-3 sm:px-4 py-1 sm:py-2 border border-primary rounded-full hover:bg-primary hover:text-neutral transition-colors duration-500 ease-in-out block  text-nowrap"
    >
      All of one <span className="font-light">(10)</span>
    </Link>
  );
};

export default CategoryFilterTab;
