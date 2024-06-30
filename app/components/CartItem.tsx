import React from "react";
import Image from "next/image";
import { TrashIcon } from "@/app/utils/Icons";
import IconsBtn from "@/app/UIElements/Miscellaneous/IconsBtn";
import productImage from "../assets/productImage.png";

const CartItem = ({ colorReverse = false }: { colorReverse?: boolean }) => {
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
            src={productImage}
            alt=""
          />
        </div>
        <span className=" capitalize ">Cocoa Butter Moisturizer</span>
      </div>
      <div className="flex justify-between items-center mt-2 sm:col-span-2">
        <IconsBtn
          style={
            colorReverse
              ? "bg-secondary hover:bg-accent"
              : "bg-secondary hover:bg-neutral"
          }
          clickEvent={() => console.log("delete item")}
        >
          <TrashIcon style="fill-danger" />
        </IconsBtn>
        <span className="">
          <span>299</span>$ X <span>10</span> = <span>2990</span>$
        </span>
      </div>
    </div>
  );
};

export default CartItem;
