"use client";
import React, { useState } from "react";
import productImage from "../../../assets/productImage.png";
import Image from "next/image";
import ProductImageOption from "./ProductImageOption";

const ProductImage = ({ images }: { images: string[] }) => {
  const [radio, setRadio] = useState<number>(1);

  const toggleRadio = (value: number) => {
    setRadio(value);
  };

  return (
    <div>
      <div className="aspect-square overflow-hidden rounded max-w-[540px] mx-auto">
        <Image
          className="w-full h-full object-center object-cover"
          src={images[radio]}
          alt=""
          width={500}
          height={500}
        />
      </div>
      <form className="mt-4  w-fit flex gap-2 justify-center max-w-[540px] mx-auto">
        {images.map((url, index) => {
          return (
            <ProductImageOption
              id={index.toString()}
              image={url.toString()}
              key={index}
              toggleRadio={toggleRadio}
              checked={index === radio}
            />
          );
        })}
      </form>
    </div>
  );
};

export default ProductImage;
