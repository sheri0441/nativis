import React from "react";

const ProductSizeButton = ({
  size,
  register,
  currentSize,
}: {
  size: string;
  register: Object;
  currentSize: string;
}) => {
  return (
    <>
      <label
        className={`text-xs px-3 py-2  bg-primary  hover:bg-opacity-100 hover:text-neutral rounded-3xl sm:text-base sm:py-3 sm:px-4 cursor-pointer ${
          currentSize === size ? "text-neutral" : "text-primary bg-opacity-25"
        }`}
      >
        <input className="hidden" type="radio" value={size} {...register} />
        {size}
      </label>
    </>
  );
};

export default ProductSizeButton;
