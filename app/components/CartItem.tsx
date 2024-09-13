import React from "react";
import Image from "next/image";
import { TrashIcon } from "@/app/utils/Icons";
import IconsBtn from "@/app/UIElements/Miscellaneous/IconsBtn";
import { CartItemFetchType } from "../utils/Interfaces";
import { useAppDispatch, useAppSelector } from "../app/hookes";
import {
  removeFromUserData,
  removeProduct,
} from "../app/features/cart/cartSlice";
import { singleDigitToDouble } from "../app-lib";

const CartItem = ({
  applyBgColorReverse = false,
  colorReverse,
  product,
  isLoading,
  disableDelete,
}: {
  applyBgColorReverse?: boolean;
  colorReverse: boolean;
  product: CartItemFetchType;
  isLoading: boolean;
  disableDelete: boolean;
}) => {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((store) => store.user.isLogin);

  const removeItemFromCart = () => {
    if (isLogin) {
      dispatch(removeFromUserData(product.id));
    } else {
      dispatch(removeProduct({ id: product.id, size: product.size }));
    }
  };

  return (
    <div
      className={`w-full  ${
        applyBgColorReverse
          ? colorReverse
            ? "text-primary  bg-neutral"
            : "text-primary bg-accent bg-opacity-30"
          : "text-neutral bg-primary"
      } sm:grid sm:grid-cols-5 px-2 py-2 sm:py-0 ${
        isLoading
          ? colorReverse
            ? "*:opacity-0 pointer-events-none animate-bgPulse"
            : "*:opacity-0 pointer-events-none animate-bgPulseAlter"
          : ""
      }`}
    >
      <div className="flex gap-4 items-center overflow-ellipsis sm:col-span-3">
        <div className="w-12 aspect-square rounded bg-neutral">
          <Image
            className="w-full h-full object-cover object-center"
            src={product.thumbnail}
            alt={product.name}
            width={500}
            height={500}
          />
        </div>
        <span className=" capitalize ">{product.name}</span>
      </div>
      <div
        className={`flex justify-between items-center mt-2 sm:mt-0 sm:py-2 sm:col-span-2 ${
          disableDelete ? "ml-auto" : ""
        }`}
      >
        {!disableDelete && (
          <IconsBtn
            style={
              colorReverse
                ? "bg-secondary hover:bg-accent"
                : "bg-secondary hover:bg-neutral"
            }
            clickEvent={removeItemFromCart}
          >
            <TrashIcon style="fill-danger" />
          </IconsBtn>
        )}
        <span className="">
          <span>{product.price}</span>$ X{" "}
          <span>{singleDigitToDouble(product.quantity)}</span> ={" "}
          <span>{(Number(product.price) * product.quantity).toFixed(2)}</span>$
        </span>
      </div>
    </div>
  );
};

export default CartItem;
