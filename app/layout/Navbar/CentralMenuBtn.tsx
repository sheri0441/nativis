"use client";
import React from "react";
import { MenuBurgerIcon } from "@/app/utils/Icons";
import style from "./CentralMenuBtn.module.css";

const CentralMenuBtn = ({ clickEvent }: { clickEvent: Function }) => {
  return (
    <button
      className={"flex gap-2 items-center " + style.hamburger}
      onClick={() => clickEvent()}
    >
      <span className="w-5">
        <MenuBurgerIcon style="fill-neutral" />
      </span>
      <span className="text-xl text-neutral uppercase">Menu</span>
      <span className="w-5">
        <MenuBurgerIcon style="fill-neutral" />
      </span>
    </button>
  );
};

export default CentralMenuBtn;
