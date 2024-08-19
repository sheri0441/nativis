"use client";
import React from "react";
import {
  CartIcon,
  LogoIcon,
  MenuBurgerIcon,
  UserIcon,
} from "../../utils/Icons";
import IconsBtn from "../../UIElements/Miscellaneous/IconsBtn";
import CentralMenuBtn from "./CentralMenuBtn";
import Navigation from "./Navigation";
import { useRouter } from "next/navigation";
import CartList from "./Cart/CartList";
import LoggedBtn from "./LoggedBtn";
import { useAppDispatch, useAppSelector } from "@/app/app/hookes";
import {
  toggleCart,
  toggleMenu,
} from "@/app/app/features/navigation/navigationSlice";
import { singleDigitToDouble } from "@/app/app-lib";

const Navbar = () => {
  const router = useRouter();
  const isLogin = useAppSelector((store) => store.user.isLogin);
  const cart = useAppSelector((store) => store.cart.cart);
  const dispatch = useAppDispatch();

  return (
    <header className="pt-4 px-6 pb-2 bg-primary  sm:pt-6 sm:px-8 sm:pb-4 lg:pt-6 lg:px-14 lg:pb-6 fixed w-full z-50">
      <div className="container flex justify-between items-center mx-auto sm:grid sm:grid-cols-3">
        <a href="/" className="w-[40px] block">
          <LogoIcon />
        </a>
        <div className="hidden sm:block mx-auto">
          <CentralMenuBtn clickEvent={() => dispatch(toggleMenu())} />
        </div>
        <div className="flex gap-2 sm:ml-auto items-start">
          <div className="relative">
            <IconsBtn
              style="bg-secondary hover:bg-neutral"
              clickEvent={() => dispatch(toggleCart())}
            >
              <CartIcon style="fill-primary" />
            </IconsBtn>
            <div className="absolute z-10 -top-1 -left-1 bg-neutral w-4 sm:5 aspect-square rounded-full text-primary ">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px]">
                {cart.length <= 100 ? singleDigitToDouble(cart.length) : "9+"}
              </span>
            </div>
          </div>
          {isLogin ? (
            <LoggedBtn />
          ) : (
            <IconsBtn
              style="bg-secondary hover:bg-neutral"
              clickEvent={() => router.push("/signin")}
            >
              <UserIcon style="fill-primary" />
            </IconsBtn>
          )}
          <div className="sm:hidden">
            <IconsBtn
              style="bg-secondary hover:bg-neutral"
              clickEvent={() => dispatch(toggleMenu())}
            >
              <MenuBurgerIcon style="fill-primary" />
            </IconsBtn>
          </div>
        </div>
      </div>

      <Navigation />
      <CartList />
    </header>
  );
};

export default Navbar;
