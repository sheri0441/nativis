import React, { ReactNode } from "react";

const ProductCardGrid = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid  grid-cols-2  sm:grid-cols-3 lg:grid-cols-4 lg:max-w-full w-fit mx-auto  gap-x-4 gap-y-5 mt-5 sm:mt-8 sm:gap-12">
      {children}
    </div>
  );
};

export default ProductCardGrid;
