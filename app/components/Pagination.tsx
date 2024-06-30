"use client";
import React from "react";
import { ArrowIcon } from "../utils/Icons";
import { useRouter, useSearchParams } from "next/navigation";
import PaginationPageButton from "../UIElements/Miscellaneous/PaginationPageButton";

const Pagination = ({
  current = 4,
  maximum = 5,
  baseURL,
}: {
  current?: number;
  maximum?: number;
  baseURL: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");

  const numberRow = [];
  if (current === 1) {
    for (let i = 0; i < 3; i++) {
      numberRow.push(current + i);
    }
  } else if (current === maximum) {
    for (let i = 0; i < 3; i++) {
      numberRow.unshift(current - i);
    }
  } else {
    for (let i = -1; i <= 1; i++) {
      numberRow.push(current + i);
    }
  }

  return (
    <div className="flex items-center gap-6 w-fit mx-auto mt-11 sm:mt-16">
      <button
        className="group w-10 aspect-square bg-primary bg-opacity-50 rounded-full hover:bg-opacity-100 p-3 transition-colors duration-500 ease-in-out disabled:opacity-50 disabled:pointer-events-none"
        onClick={() => router.push(baseURL + `${sort ? `?sort=${sort}` : ""}`)}
        disabled={current === 1}
      >
        <ArrowIcon style="fill-primary group-hover:fill-neutral" />
      </button>
      {numberRow.map((num) => {
        return (
          <PaginationPageButton
            key={num}
            number={num}
            baseURL={baseURL}
            sort={sort}
            selected={num === current}
          />
        );
      })}
      <button
        className="group w-10 aspect-square bg-primary bg-opacity-50 rounded-full hover:bg-opacity-100 rotate-180 p-3 transition-colors duration-500 ease-in-out disabled:opacity-50  disabled:pointer-events-none"
        onClick={() => router.push(baseURL + `${sort ? `?sort=${sort}` : ""}`)}
        disabled={current === maximum}
      >
        <ArrowIcon style="fill-primary group-hover:fill-neutral" />
      </button>
    </div>
  );
};

export default Pagination;
