"use client";
import React, { useEffect, useState } from "react";
import { LogoIcon } from "../../utils/Icons";
import style from "./LoadingScreen.module.css";

const LoadingScreen = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loader = document.getElementById("loader");
      if (loader) setIsLoaded(true);
    }
  }, []);
  return (
    <div
      className={`bg-primary w-screen h-screen fixed top-0 left-0 z-[99] transition-all duration-1000 ${
        isLoaded && "-translate-x-full"
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
