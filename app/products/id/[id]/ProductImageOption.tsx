import React from "react";
import Image, { StaticImageData } from "next/image";

const ProductImageOption = ({
  image,
  id,
  toggleRadio,
  checked,
  errorFunction,
}: {
  image: string | StaticImageData;
  id: string;
  toggleRadio: Function;
  checked: boolean;
  errorFunction: Function;
}) => {
  return (
    <>
      <label
        className={`block w-1/5 min-w-1/5 aspect-square overflow-hidden hover:opacity-50 rounded  checked:border-accent checked:border-4 hover:border-accent hover:border-4 cursor-pointer ${
          checked ? "border-accent border-4 opacity-50 pointer-events-none" : ""
        }`}
        htmlFor={id}
        onClick={() => toggleRadio(Number(id))}
      >
        <Image
          className="w-full h-full object-cover object-center"
          src={image}
          alt={""}
          width={100}
          height={100}
          onError={() => errorFunction()}
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
