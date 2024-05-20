"use client";
import React from "react";
import { MenuBurger } from "@/app/UIElements/Icons";
import { color } from "@/app/UIElements/colors";
import style from "./CentralMenuBtn.module.css";

const CentralMenuBtn = ({ clickEvent }: { clickEvent: Function }) => {
  return (
    <button
      className={"flex gap-2 items-center " + style.hamburger}
      onClick={() => clickEvent()}
    >
      <span className="w-5">
        <MenuBurger color={color.neutral} />
      </span>
      <span className="text-xl text-neutral uppercase">Menu</span>
      <span className="w-5">
        <MenuBurger color={color.neutral} />
      </span>
    </button>
  );
};

export default CentralMenuBtn;
