import React, { ReactNode } from "react";

const PageTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h1 className="text-[32px]  font-bold capitalize text-center sm:text-5xl lg:text-6xl">
      {children}
    </h1>
  );
};

export default PageTitle;
