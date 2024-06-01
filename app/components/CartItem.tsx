import { Trash } from "@/app/UIElements/Icons";
import IconsBtn from "@/app/UIElements/IconsBtn";
import { color } from "@/app/UIElements/colors";
import React from "react";

const CartItem = () => {
  return (
    <div className="w-full text-neutral sm:grid sm:grid-cols-5">
      <div className="flex gap-4 items-center overflow-ellipsis sm:col-span-3">
        <div className="w-12 aspect-square rounded bg-neutral"></div>
        <span className=" capitalize">Cocoa Butter Moisturizer</span>
      </div>
      <div className="flex justify-between items-center mt-2 sm:col-span-2">
        <IconsBtn clickEvent={() => console.log("delete item")}>
          <Trash color={color.danger} />
        </IconsBtn>
        <span className="">
          <span>299</span>$ X <span>10</span> = <span>2990</span>$
        </span>
      </div>
    </div>
  );
};

export default CartItem;
