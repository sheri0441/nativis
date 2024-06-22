import React from "react";
import Image from "next/image";

const ProductImageOption = ({
  image,
  id,
  toggleRadio,
  checked,
}: {
  image: string;
  id: string;
  toggleRadio: Function;
  checked: boolean;
}) => {
  return (
    <>
      <label
        className={`block w-1/5 aspect-square overflow-hidden hover:opacity-50 rounded  checked:border-accent checked:border-4 hover:border-accent hover:border-4 cursor-pointer ${
          checked ? "border-accent border-4 opacity-50 pointer-events-none" : ""
        }`}
        htmlFor={id}
        onClick={() => toggleRadio(Number(id))}
      >
        <Image
          className="w-full h-full object-cover object-center"
          src={image}
          alt={image}
          width={100}
          height={100}
        />
      </label>
      <input
        className="hidden"
        type="radio"
        name="images"
        id={id}
        checked={checked}
      />
    </>
  );
};

export default ProductImageOption;
