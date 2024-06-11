import Link from "next/link";
import React from "react";

const PaginationPageButton = ({
  baseURL,
  sort,
  number,
  selected,
}: {
  baseURL: string;
  sort: string | null;
  number: Number;
  selected: boolean;
}) => {
  return (
    <Link
      href={baseURL + number + `${sort ? `?sort=${sort}` : ""}`}
      className={`block relative w-8 bg-primary  hover:bg-opacity-100 hover:text-neutral aspect-square rounded-full overflow-hidden transition-colors duration-500 ease-in-out ${
        selected ? "pointer-events-none text-neutral" : "bg-opacity-50"
      }`}
    >
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {number.toString()}
      </span>
    </Link>
  );
};

export default PaginationPageButton;
