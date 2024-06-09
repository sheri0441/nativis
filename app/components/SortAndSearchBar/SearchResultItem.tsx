import Image from "next/image";
import React from "react";
import image from "../../assets/productImage.png";
import Link from "next/link";

const SearchResultItem = () => {
  return (
    <Link
      href=""
      className="w-full flex p-2 items-center gap-2 text-primary hover:text-neutral hover:bg-accent"
    >
      <div className="w-10 h-10 rounded overflow-hidden">
        <Image
          className="w-full h-full object-cover object-center"
          src={image}
          alt="hello"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-light opacity-50">Category</span>
        <span className="">name</span>
      </div>
    </Link>
  );
};

export default SearchResultItem;
