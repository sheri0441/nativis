import React, { ReactNode } from "react";

const MainTag = ({
  children,
  extraStyle,
}: {
  children: ReactNode;
  extraStyle?: string;
}) => {
  return (
    <main
      className={`container pt-24 mx-auto px-6 sm:px-8 lg:px-14 sm:pt-32 text-primary lg:pt-40 ${extraStyle}`}
    >
      {children}
    </main>
  );
};

export default MainTag;
