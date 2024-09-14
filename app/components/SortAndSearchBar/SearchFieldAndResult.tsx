"use client";
import React, { useEffect, useState } from "react";
import SearchResultItem from "./SearchResultItem";
import Link from "next/link";
import { CrossIcon } from "../../utils/Icons";
import style from "./SearchFieldAndResult.module.css";
import { usePathname } from "next/navigation";
import { SearchResultList } from "@/app/utils/Interfaces";
import axios from "axios";

const SearchFieldAndResult = ({
  closeSearchField,
  showSearch,
  baseSearchURL,
  baseResultPageURL,
}: {
  closeSearchField: Function;
  showSearch: boolean;
  baseSearchURL: string;
  baseResultPageURL: string;
}) => {
  const [searchField, setSearchField] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultList, setResultList] = useState<SearchResultList | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (searchField.length > 0) {
      const url =
        process.env.NEXT_PUBLIC_BASE_URL + baseSearchURL + searchField;
      const fetchDate = async () => {
        setIsLoading(true);

        try {
          const response = await axios.get(url);
          if (response.status !== 200) {
            throw new Error(response.data.message);
          }
          const result = response.data;
          setResultList(result);
        } catch (error) {}

        setIsLoading(false);
      };
      fetchDate();
    }
  }, [searchField, baseSearchURL]);

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
            <CrossIcon style="fill-neutral" />
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
        {resultList !== null && (
          <div
            className={`w-full bg-neutral absolute top-[110%] rounded overflow-hidden shadow-[0px_0px_4px_rgb(40,54,24)] transition-[height] duration-500 ease-in-out flex flex-col ${
              showSearch && searchField.length > 0 && !isLoading
                ? "h-[232px]"
                : "h-0"
            }`}
          >
            <div className="bg-primary text-neutral px-2 ">
              <span className="text-sm opacity-50">
                Result <strong> {resultList?.total}</strong>
              </span>
            </div>
            {resultList.list.length > 0 ? (
              <>
                <div>
                  {resultList.list.map((item) => (
                    <SearchResultItem
                      key={item.id}
                      item={item}
                      url={baseResultPageURL + item.id}
                    />
                  ))}
                </div>
                <Link
                  href={
                    `${
                      pathname.includes("products") ? "/products" : "/blogs"
                    }` + `/s/${searchField}/p/1`
                  }
                  className="w-full text-center block bg-primary text-neutral hover:bg-accent py-2 mt-auto"
                >
                  View All
                </Link>
              </>
            ) : (
              <span className="block text-center font-medium text-primary opacity-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                No Result Found
              </span>
            )}
          </div>
        )}
      </div>
      {isLoading && (
        <div className="w-2 aspect-square bg-primary rounded-full col-start-3 sm:col-start-3 row-start-1"></div>
      )}
    </div>
  );
};

export default SearchFieldAndResult;
