import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CategoryFilterTab = ({
  name,
  url,
  checkCategory,
}: {
  name: string;
  url: string;
  checkCategory: boolean;
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={`${pathname.includes("products") ? "/products" : "/blogs"}` + url}
      className={`text-sm sm:text-base px-3 sm:px-4 py-1 sm:py-2 border border-primary rounded-full hover:bg-primary hover:text-neutral transition-colors duration-500 ease-in-out block  text-nowrap capitalize ${
        checkCategory
          ? "bg-primary text-neutral pointer-events-none cursor-default"
          : "bg-neutral text-primary"
      }`}
    >
      {name}
    </Link>
  );
};

export default CategoryFilterTab;
