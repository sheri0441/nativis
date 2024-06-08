"use client";
import React, { useEffect, useState } from "react";
import { SearchIcon } from "../UIElements/Icons";
import { color } from "../UIElements/colors";
import style from "./SearchOption.module.css";
import Image from "next/image";
import image from "../assets/productImage.png";

const SearchOption = () => {
  const [showSearch, setShowSearch] = useState<boolean>(true);
  const [searchField, setSearchField] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    <div className="  mx-auto  mt-5 relative">
      <button
        className={`bg-primary bg-opacity-25 w-8 rounded-full aspect-square p-2 mx-auto block transition-all duration-500 ease-in-out ${
          showSearch ? "opacity-0" : ""
        }`}
        onClick={() => setShowSearch((pervState) => (pervState = true))}
      >
        <SearchIcon fill={color.primary} />
      </button>

      <div
        className={`mx-auto transition-[width] duration-500 ease-in-out absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 ${
          !showSearch ? "w-0" : "w-full"
        } ${style.dot_animation}`}
      >
        {isLoading && (
          <div className="w-2 aspect-square bg-primary rounded-full"></div>
        )}
        <div id="form" className="relative">
          <form
            autoComplete="off"
            className={`bg-primary flex flex-row-reverse rounded-3xl overflow-hidden max-w-60  `}
          >
            <label
              htmlFor="search"
              className="p-2 bg-primary bg-opacity-25 w-8 block "
              onClick={() => setShowSearch((pervState) => (pervState = false))}
            >
              <SearchIcon fill={color.neutral} />
            </label>
            <input
              className="bg-primary focus:outline-none  text-neutral w-full p-2 text-sm pl-4 placeholder:text-neutral placeholder:opacity-50 autofill:bg-primary autofill:focus:bg-primary autofill:hover:bg-primary"
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
          <div className="w-full bg-primary absolute top-[110%]">
            <div className="w-full flex p-2 items-center gap-2">
              <div className="w-10 h-10 rounded overflow-hidden">
                <Image
                  className="w-full h-full object-cover object-center"
                  src={image}
                  alt="hello"
                />
              </div>
              <div className="flex flex-col text-neutral">
                <span className="text-xs font-light">Category</span>
                <span className=" font-bold">name</span>
              </div>
            </div>
          </div>
        </div>
        {isLoading && (
          <div className="w-2 aspect-square bg-primary rounded-full"></div>
        )}
      </div>
    </div>
  );
};

export default SearchOption;
