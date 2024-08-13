import React from "react";

const SortAndSearchBarLoading = () => {
  return (
    <div className="mt-5 sm:mt-8 flex flex-col gap-5 items-center sm:flex-row-reverse sm:justify-between">
      <div className="flex items-center gap-2 text-sm mx-auto w-fit sm:mx-0 ">
        <span>Sort By:</span>
        <div className="relative">
          <div
            className={
              " bg-secondary py-1 px-2 rounded-full flex  items-center w-28  justify-between  h-[30px] animate-bgPulse"
            }
          ></div>
        </div>
      </div>

      <div className="relative">
        <div
          className={`group bg-primary bg-opacity-25 w-8 rounded-full aspect-square p-2 mx-auto block  `}
        ></div>
      </div>
    </div>
  );
};

export default SortAndSearchBarLoading;
