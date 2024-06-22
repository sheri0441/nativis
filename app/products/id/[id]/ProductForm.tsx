"use client";
import React, { useEffect } from "react";
import { MinusIcon, PlusIcon } from "@/app/UIElements/Icons";
import { color } from "@/app/UIElements/colors";
import ProductQuantityButton from "./ProductQuantityButton";
import { productData } from "@/app/utils/Interfaces";
import { useForm } from "react-hook-form";

import ProductSizeButton from "./ProductSizeButton";

type FormData = {
  size: string;
  quantity: number;
};

const ProductForm = ({ productData }: { productData: productData }) => {
  const sizeOfProduct = Object.keys(productData.prices);

  const { register, setValue, handleSubmit, watch, getValues, reset } =
    useForm<FormData>({
      defaultValues: {
        size: sizeOfProduct[0],
        quantity: 1,
      },
    });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    reset({ size: sizeOfProduct[0], quantity: 1 });
  });

  const size = getValues("size") as keyof typeof productData.prices;
  const price = productData.prices[size];

  return (
    <form onSubmit={onSubmit}>
      {/* size control panel */}
      <div className="flex gap-2 w-fit mx-auto mt-5 sm:mt-6 sm:gap-6 lg:ml-0">
        {sizeOfProduct.length > 1 &&
          Object.keys(productData.prices).map((size) => {
            return (
              <ProductSizeButton
                key={size}
                size={size}
                register={{ ...register(`size`) }}
                currentSize={watch("size")}
              />
            );
          })}
      </div>
      {/* <div className="lg:flex lg:items-center"> */}
      {/* quantity control panel */}
      <div className="w-44 sm:w-60 flex justify-between items-center bg-primary bg-opacity-25 rounded-full mx-auto mt-4 sm:mt-8 lg:ml-0">
        <ProductQuantityButton
          clickEvent={() =>
            getValues("quantity") > 1 &&
            setValue("quantity", getValues("quantity") - 1)
          }
        >
          <MinusIcon fill={color.neutral} style="group-hover:fill-neural" />
        </ProductQuantityButton>
        <span className="sm:text-xl">{watch("quantity")}</span>
        <ProductQuantityButton
          clickEvent={() => setValue("quantity", getValues("quantity") + 1)}
        >
          <PlusIcon fill={color.neutral} style="group-hover:fill-neural" />
        </ProductQuantityButton>
      </div>
      {/* Price panel */}
      <span className="block text-[40px] font-medium text-center mt-4 sm:text-[64px] lg:text-left">
        ${(price * getValues("quantity")).toFixed(2)}
      </span>
      {/* </div> */}
      {/* Button panel */}
      <div className="flex flex-col gap-4 mt-4 sm:mt-6 sm:flex-row max-w-[540px] mx-auto lg:ml-0 lg:max-w-full">
        <button
          className="font-medium capitalize py-3 w-full sm:text-xl sm:py-[18px] bg-primary text-neutral rounded-full hover:bg-accent"
          type="submit"
        >
          Add to Cart
        </button>
        <button
          className="font-medium capitalize py-3 w-full bg-primary bg-opacity-50 sm:text-xl  sm:py-[18px] text-primary hover:text-neutral rounded-full hover:bg-opacity-100 "
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            console.log("go to checkout page");
          }}
        >
          Buy now
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
