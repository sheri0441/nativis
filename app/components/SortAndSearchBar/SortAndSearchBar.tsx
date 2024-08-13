import React from "react";
import SortBy from "./SortBy";
import SearchOption from "./SearchOption";

const SortAndSearchBar = ({
  baseSearchURL,
  baseResultPageURL,
}: {
  baseSearchURL: string;
  baseResultPageURL: string;
}) => {
  return (
    <div className="mt-5 sm:mt-8 flex flex-col gap-5 items-center sm:flex-row-reverse sm:justify-between">
      <SortBy />
      <SearchOption
        baseResultPageURL={baseResultPageURL}
        baseSearchURL={baseSearchURL}
      />
    </div>
  );
};

export default SortAndSearchBar;
