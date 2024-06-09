import React from "react";
import SortBy from "./SortBy";
import SearchOption from "./SearchOption";

const SortAndSearchBar = () => {
  return (
    <div className="mt-5 sm:mt-8 flex flex-col gap-5 items-center sm:flex-row-reverse sm:justify-between">
      <SortBy />
      <SearchOption />
    </div>
  );
};

export default SortAndSearchBar;
