"use client";
import React, { useState } from "react";
import { SearchIcon } from "../../UIElements/Icons";
import { color } from "../../UIElements/colors";

import SearchFieldAndResult from "./SearchFieldAndResult";

const SearchOption = () => {
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
        <SearchIcon fill={color.primary} hoverFill="fill-neutral" />
      </button>

      <SearchFieldAndResult
        closeSearchField={closeSearchField}
        showSearch={showSearch}
      />
    </div>
  );
};

export default SearchOption;
