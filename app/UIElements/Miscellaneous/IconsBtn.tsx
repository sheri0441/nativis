"use client";
import React from "react";

const IconsBtn = ({
  children,
  clickEvent,
  style,
}: {
  children: React.ReactNode;
  clickEvent: Function;
  style: string;
}) => {
  return (
    <button
      className={` relative w-10 aspect-square rounded-full  lg:w-12 transition-all duration-500 ease-in-out ${style}`}
      onClick={() => clickEvent()}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        {children}
      </div>
    </button>
  );
};

export default IconsBtn;
