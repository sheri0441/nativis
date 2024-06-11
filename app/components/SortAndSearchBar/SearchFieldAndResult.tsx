"use client";
import React, { useEffect, useState } from "react";
import SearchResultItem from "./SearchResultItem";
import Link from "next/link";
import { Cross } from "../../UIElements/Icons";
import { color } from "../../UIElements/colors";
import style from "./SearchFieldAndResult.module.css";
import { usePathname } from "next/navigation";

const SearchFieldAndResult = ({
  closeSearchField,
  showSearch,
}: {
  closeSearchField: Function;
  showSearch: boolean;
}) => {
  const [searchField, setSearchField] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading((prevState) => (prevState = true));
    const textLoading = setTimeout(() => {
      setIsLoading((pervState) => (pervState = false));
    }, 10000);

    return () => {
      clearTimeout(textLoading);
    };
  }, [searchField]);
  return (
    <div
      className={`transition-all duration-500 ease-in-out absolute top-0 right-[350%]   sm:left-0   sm:translate-x-0 grid grid-cols-[8px_232px_8px] gap-2  sm:grid-cols-[232px_8px_8px] items-center z-20 ${
        !showSearch ? "w-0 opacity-0 pointer-events-none" : "w-full opacity-100"
      } ${style.dot_animation}`}
    >
      {isLoading && (
        <div className="w-2 aspect-square bg-primary rounded-full col-start-1 sm:col-start-2"></div>
      )}
      <div
        id="form"
        className="relative col-start-2 sm:col-start-1  row-start-1 w-fit"
      >
        <form
          autoComplete="off"
          className={`bg-primary flex flex-row-reverse rounded-3xl overflow-hidden max-w-60  `}
        >
          <button
            className="p-2 bg-primary bg-opacity-25 w-8 block cursor-pointer"
            onClick={() => closeSearchField()}
            type="button"
          >
            <Cross color={color.neutral} />
          </button>
          <input
            className="bg-primary focus:outline-none  text-neutral w-full p-2 text-sm pl-4 placeholder:text-neutral placeholder:opacity-50 autofill:bg-primary autofill:focus:bg-primary autofill:hover:bg-primary appearance-none"
            type="search"
            name="search"
            id="search"
            placeholder="Search here"
            value={searchField}
            onChange={(e) =>
              setSearchField((pervState) => (pervState = e.target.value))
            }
          />
        </form>
        <div
          className={`w-full bg-neutral absolute top-[110%] rounded overflow-hidden shadow-[0px_0px_4px_rgb(40,54,24)] transition-[height] duration-500 ease-in-out ${
            showSearch && searchField.length > 0 ? "h-[232px]" : "h-0"
          }`}
        >
          <div className="bg-primary text-neutral px-2 ">
            <span className="font-bold text-sm opacity-50">Result 26</span>
          </div>
          <div>
            <SearchResultItem />
            <SearchResultItem />
            <SearchResultItem />
          </div>
          <Link
            href={
              `${pathname.includes("products") ? "/products" : "/blogs"}` +
              `/search?search=${searchField}`
            }
            className="w-full text-center block bg-primary text-neutral hover:bg-accent py-2"
          >
            View All
          </Link>
        </div>
      </div>
      {isLoading && (
        <div className="w-2 aspect-square bg-primary rounded-full col-start-3 sm:col-start-3 row-start-1"></div>
      )}
    </div>
  );
};

export default SearchFieldAndResult;
