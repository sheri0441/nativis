import React from "react";

const ProductCardLoading = () => {
  return (
    <div className={`w-full block `}>
      <div className="aspect-square rounded overflow-hidden  ">
        <div className="relative w-full h-full "></div>
      </div>
      <p className="text-center text-primary line-clamp-2 mt-2 opacity-0">
        product name
      </p>

      <p className="text-center text-primary font-medium opacity-0">$0.00</p>
    </div>
  );
};

export default ProductCardLoading;
