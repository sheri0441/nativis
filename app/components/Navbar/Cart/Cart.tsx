import { Cross, Trash } from "@/app/UIElements/Icons";
import IconsBtn from "@/app/UIElements/IconsBtn";
import { color } from "@/app/UIElements/colors";
import React from "react";
import CartItem from "./CartItem";
import Link from "next/link";

const CartList = ({
  showCart,
  toggleCart,
}: {
  showCart: boolean;
  toggleCart: Function;
}) => {
  return (
    <div
      className={`fixed top-0 left-0  inset-0 bg-primary z-10 transition-all duration-500 ease-in-out h-screen min-h-fit ${
        !showCart && "-translate-y-[150%]"
      }`}
    >
      <div className="w-full max-w-[640px] text-center mx-auto pt-12 sm:pt-14">
        <span className="text-xl sm:text-3xl font-medium text-neutral uppercase">
          Shopping Cart
        </span>
        <div className="w-full px-4 sm:px-0 mt-10 sm:mt-12 mx-auto flex flex-col gap-3">
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
        <hr className="border-neutral h-0.5 mt-4" />
        <div className="text-neutral flex flex-col mt-4">
          <span className="text-4xl font-medium">3500$</span>
          <span>Total</span>
        </div>

        <Link
          href={"/"}
          className="mt-10 sm:mt-12  block border-2 border-neutral rounded-full w-fit px-4 py-2 text-neutral mx-auto hover:bg-neutral hover:text-primary transition-all duration-500 ease-in-out font-medium sm:text-2xl sm:px-6 sm:py-3"
        >
          Checkout
        </Link>
        <div className="mt-12 mb-5 sm:mb-6">
          <IconsBtn clickEvent={() => toggleCart()}>
            <Cross color={color.primary} />
          </IconsBtn>
        </div>
      </div>
    </div>
  );
};

export default CartList;
