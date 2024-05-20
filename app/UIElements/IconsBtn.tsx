"use client";

import React from "react";

const IconsBtn = ({
  children,
  clickEvent,
}: {
  children: React.ReactNode;
  clickEvent: Function;
}) => {
  return (
    <button
      className={`bg-secondary relative w-10 aspect-square rounded-full hover:bg-neutral lg:w-12 transition-all duration-500 ease-in-out`}
      onClick={() => clickEvent()}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        {children}
      </div>
    </button>
  );
};

export default IconsBtn;
