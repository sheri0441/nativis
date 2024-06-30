"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  CartIcon,
  LogoIcon,
  MenuBurgerIcon,
  UserIcon,
} from "../../utils/Icons";
import IconsBtn from "../../UIElements/Miscellaneous/IconsBtn";
import CentralMenuBtn from "./CentralMenuBtn";
import Navigation from "./Navigation";
import CartList from "./Cart/Cart";
import LoggedBtn from "./LoggedBtn";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <header className="pt-4 px-6 pb-2 bg-primary  sm:pt-6 sm:px-8 sm:pb-4 lg:pt-6 lg:px-14 lg:pb-6 fixed w-full z-50">
      <div className="container flex justify-between items-center mx-auto sm:grid sm:grid-cols-3">
        <a href="" className="w-[40px] block">
          <LogoIcon />
        </a>
        <div className="hidden sm:block mx-auto">
          <CentralMenuBtn clickEvent={toggleMenu} />
        </div>
        <div className="flex gap-2 sm:ml-auto">
          <div className="relative">
            <IconsBtn
              style="bg-secondary hover:bg-neutral"
              clickEvent={toggleCart}
            >
              <CartIcon style="fill-primary" />
            </IconsBtn>
            <div className="absolute z-10 -top-1 -left-1 bg-neutral w-4 sm:5 aspect-square rounded-full text-primary ">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px]">
                00
              </span>
            </div>
          </div>
          {false ? (
            <IconsBtn
              style="bg-secondary hover:bg-neutral"
              clickEvent={toggleMenu}
            >
              <UserIcon style="fill-primary" />
            </IconsBtn>
          ) : (
            <LoggedBtn />
          )}
          <div className="sm:hidden">
            <IconsBtn
              style="bg-secondary hover:bg-neutral"
              clickEvent={toggleMenu}
            >
              <MenuBurgerIcon style="fill-primary" />
            </IconsBtn>
          </div>
        </div>
      </div>

      <Navigation toggleMenu={toggleMenu} showMenu={showMenu} />
      <CartList toggleCart={toggleCart} showCart={showCart} />
    </header>
  );
};

export default Navbar;
