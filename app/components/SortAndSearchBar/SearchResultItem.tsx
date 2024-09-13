import Image from "next/image";
import React from "react";
import Link from "next/link";
import { SearchResultItem as SearchResultItemType } from "@/app/utils/Interfaces";

const SearchResultItem = ({
  item,
  url,
}: {
  item: SearchResultItemType;
  url: string;
}) => {
  return (
    <Link
      href={url}
      className="w-full flex p-2 items-center gap-2 text-primary hover:text-neutral hover:bg-accent"
    >
      <div className="min-w-10 max-w-10 min-h-10 max-h-10 rounded overflow-hidden aspect-square">
        <Image
          className="w-full h-full object-cover object-center"
          src={item.thumbnail}
          alt="hello"
          height={500}
          width={500}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-light opacity-50 capitalize">
          {item.category}
        </span>
        <span className="line-clamp-1">
          {item.name ? item.name : item.title}
        </span>
      </div>
    </Link>
  );
};

export default SearchResultItem;
