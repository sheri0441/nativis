"use client";
import React, { useState } from "react";
import Image from "next/image";
import ProductImageOption from "./ProductImageOption";
import placeHolder from "../../../assets/logo.png";

const ProductImage = ({ images }: { images: string[] }) => {
  const [radio, setRadio] = useState<number>(0);
  const [imageError, setImageError] = useState<boolean[]>(
    new Array(images.length).fill(false)
  );

  const toggleRadio = (value: number) => {
    setRadio(value);
  };

  const onImageError = (index: number) => {
    setImageError((prev) => {
      const newErrors = [...prev];
      newErrors[index] = true;
      return newErrors;
    });
  };

  return (
    <div>
      <div className="aspect-square overflow-hidden rounded max-w-[540px] mx-auto">
        {images.map((image, index) => (
          <Image
            className={`w-full h-full object-center object-cover ${
              radio === index ? "" : "hidden"
            }`}
            src={imageError[index] ? placeHolder : image}
            alt=""
            width={500}
            height={500}
            key={index}
            onError={() => onImageError(index)}
          />
        ))}
      </div>
      <form className="mt-4  w-full flex gap-2 justify-center max-w-[540px] mx-auto ">
        {images.map((url, index) => {
          return (
            <ProductImageOption
              id={index.toString()}
              image={imageError[index] ? placeHolder : url}
              key={index}
              toggleRadio={toggleRadio}
              checked={index === radio}
              errorFunction={() => onImageError(index)}
            />
          );
        })}
      </form>
    </div>
  );
};

export default ProductImage;
