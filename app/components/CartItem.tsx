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
  colorReverse = false,
  product,
}: {
  colorReverse?: boolean;
  product: CartItemFetchType;
}) => {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((store) => store.user.isLogin);

  const removeItemFromCart = () => {
    if (isLogin) {
      dispatch(removeFromUserData(product.id));
    } else {
      dispatch(removeProduct(product.id));
    }
  };

  return (
    <div
      className={`w-full ${
        colorReverse ? " text-primary" : "text-neutral"
      } sm:grid sm:grid-cols-5 px-2`}
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
      <div className="flex justify-between items-center mt-2 sm:col-span-2">
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
