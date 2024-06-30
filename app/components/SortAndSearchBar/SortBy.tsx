"use client";
import React, { useEffect, useState } from "react";
import { ArrowIcon } from "../../utils/Icons";
import style from "./SortBy.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SortBy = () => {
  const [showSort, setShowSort] = useState<boolean>(false);
  const [sortInnerText, setSortInnerText] = useState<string>("Newest");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const sort = searchParams.get("sort");
  const search = searchParams.get("search");

  const changeSortValue = (e: any) => {
    setSortInnerText((pervState) => (pervState = e.target!.innerHTML));
    setShowSort((pervState) => !pervState);
    router.push(
      pathname +
        "?" +
        `sort=${e.target!.innerHTML.toLowerCase()}` +
        `${page !== null ? `&page={${page}}` : ""}` +
        `${search !== null ? `&search={${search}}` : ""}`
    );
  };

  return (
    <div className="flex items-center gap-2 text-sm mx-auto w-fit sm:mx-0">
      <span>Sort By:</span>
      <div className="relative">
        <button
          className={
            "border border-primary bg-neutral py-1 px-2 rounded-full flex  items-center hover:bg-primary hover:text-neutral transition-colors duration-500 ease-in-out w-28  justify-between  " +
            style.sortby
          }
          onClick={() => setShowSort((pervState) => !pervState)}
        >
          {sortInnerText}
          <div
            className={`w-1 transition-transform duration-500 ease-in-out  ${
              showSort ? " rotate-90" : "-rotate-90"
            }`}
          >
            <ArrowIcon style="fill-primary group-hover:fill-neutral" />
          </div>
        </button>

        <ul
          className={`absolute z-20 flex flex-col items-start *:py-1 *:px-2 bg-neutral w-full shadow-[0px_0px_4px_0px_rgb(40,54,24)] rounded  duration-1000 ease-in-out top-11 overflow-hidden *:cursor-pointer transition-[height]  ${
            !showSort ? "h-0 " : "h-28"
          }`}
        >
          <li
            className="hover:bg-accent hover:text-neutral w-full text-left"
            onClick={changeSortValue}
          >
            Newest
          </li>
          <li
            className="hover:bg-accent hover:text-neutral w-full text-left"
            onClick={changeSortValue}
          >
            Oldest
          </li>
          <li
            className="hover:bg-accent hover:text-neutral w-full text-left"
            onClick={changeSortValue}
          >
            A-Z
          </li>
          <li
            className="hover:bg-accent hover:text-neutral w-full text-left"
            onClick={changeSortValue}
          >
            Z-A
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SortBy;
