"use client";

import React from "react";

const IconsBtn = ({ children }: { children: React.ReactNode }) => {
  return (
    <button
      className={`bg-secondary relative w-6 h-6 rounded-full hover:bg-neutral`}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        {children}
      </div>
    </button>
  );
};

export default IconsBtn;
