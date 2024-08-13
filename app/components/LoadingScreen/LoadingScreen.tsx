"use client";
import React from "react";
import { LogoIcon } from "../../utils/Icons";
import style from "./LoadingScreen.module.css";
import { useAppSelector } from "@/app/app/hookes";

const LoadingScreen = () => {
  const isLoading = useAppSelector((store) => store.loading.isLoading);

  console.log("Loading state:", isLoading);
  return (
    <div
      className={`bg-primary w-screen h-screen fixed top-0 left-0 z-[99] transition-all duration-1000 ${
        !isLoading ? "-translate-x-full" : "translate-x-0"
      }`}
      id="loader"
    >
      <div
        className={`w-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 md:w-24 ${style.sh_logoAnimation}`}
      >
        <LogoIcon />
      </div>
    </div>
  );
};

export default LoadingScreen;
