"use client";
import React, { useState } from "react";
import { SearchIcon } from "../../utils/Icons";

import SearchFieldAndResult from "./SearchFieldAndResult";

const SearchOption = ({
  baseResultPageURL,
  baseSearchURL,
}: {
  baseSearchURL: string;
  baseResultPageURL: string;
}) => {
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const closeSearchField = () => {
    setShowSearch((pervState) => (pervState = false));
  };

  return (
    <div className="relative">
      <button
        className={`group bg-primary bg-opacity-25 w-8 rounded-full aspect-square p-2 mx-auto block transition-all duration-500 ease-in-out hover:bg-opacity-100  ${
          showSearch ? "opacity-0" : "opacity-100"
        }`}
        onClick={() => setShowSearch((pervState) => (pervState = true))}
      >
        <SearchIcon style="fill-primary group-hover:fill-neutral" />
      </button>

      <SearchFieldAndResult
        closeSearchField={closeSearchField}
        showSearch={showSearch}
        baseResultPageURL={baseResultPageURL}
        baseSearchURL={baseSearchURL}
      />
    </div>
  );
};

export default SearchOption;
