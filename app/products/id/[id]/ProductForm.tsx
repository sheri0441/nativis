"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MinusIcon, PlusIcon } from "@/app/utils/Icons";
import { productData } from "@/app/utils/Interfaces";
import SubmitButton from "@/app/UIElements/FormElements/SubmitButton";
import ProductQuantityButton from "./ProductQuantityButton";
import ProductSizeButton from "./ProductSizeButton";
import { useAppDispatch, useAppSelector } from "@/app/app/hookes";
import { addProduct, addToUserData } from "@/app/app/features/cart/cartSlice";
import { singleDigitToDouble } from "@/app/app-lib";

type FormData = {
  size: string;
  quantity: number;
};

const ProductForm = ({ productData }: { productData: productData }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((store) => store.user.isLogin);

  const sizeOfProduct = Object.keys(productData.price);

  const toggleLoading = () => setIsLoading((perv) => !perv);

  const { register, setValue, handleSubmit, watch, getValues, reset } =
    useForm<FormData>({
      defaultValues: {
        size: sizeOfProduct[0],
        quantity: 1,
      },
    });

  const onSubmit = handleSubmit(async (data) => {
    if (data.quantity === 0) {
      return;
    }

    setIsLoading(true);

    let product;

    if (sizeOfProduct.length === 1) {
      product = { id: productData.id, quantity: data.quantity };
    } else {
      product = {
        id: productData.id,
        quantity: data.quantity,
        size: data.size,
      };
    }

    if (isLogin) {
      await dispatch(addToUserData(product));
    } else {
      dispatch(addProduct(product));
    }

    // setTimeout(toggleLoading, 1000);
    setIsLoading(false);
    reset({ size: sizeOfProduct[0], quantity: 1 });
  });

  const size = getValues("size") as keyof typeof productData.price;
  const price = productData.price[size];

  return (
    <form onSubmit={onSubmit}>
      {/* size control panel */}
      <div className="flex gap-2 w-fit mx-auto mt-5 sm:mt-6 sm:gap-6 lg:ml-0">
        {sizeOfProduct.length > 1 &&
          Object.keys(productData.price).map((size) => {
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

      <div className="w-44 sm:w-60 flex justify-between items-center bg-primary bg-opacity-25 rounded-full mx-auto mt-4 sm:mt-8 lg:ml-0">
        <ProductQuantityButton
          clickEvent={() =>
            getValues("quantity") > 1 &&
            setValue("quantity", getValues("quantity") - 1)
          }
        >
          <MinusIcon style="fill-neutral group-hover:fill-neural" />
        </ProductQuantityButton>
        <span className="sm:text-xl">
          {singleDigitToDouble(watch("quantity"))}
        </span>
        <ProductQuantityButton
          clickEvent={() =>
            getValues("quantity") < 99 &&
            setValue("quantity", getValues("quantity") + 1)
          }
        >
          <PlusIcon style="fill-neutral group-hover:fill-neural" />
        </ProductQuantityButton>
      </div>
      {/* Price panel */}
      <span className="block text-[40px] font-medium text-center mt-4 sm:text-[64px] lg:text-left">
        ${(price * getValues("quantity")).toFixed(2)}
      </span>

      {/* Button panel */}
      <div className="flex flex-col gap-4 mt-4 sm:mt-6 sm:flex-row max-w-[540px] mx-auto lg:ml-0 lg:max-w-full">
        <SubmitButton
          extraStyle="w-full"
          loading={isLoading}
          text="Add to cart"
        />
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
