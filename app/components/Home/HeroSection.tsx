import Link from "next/link";
import React from "react";
import { Logo } from "@/app/UIElements/Icons";
import HeroBgImage from "./HeroBgImage";

const HeroSection = () => {
  return (
    <div className="bg-primary px-6 pt-28 pb-10 sm:pt-48 sm:pb-16 lg:pb-20 text-neutral bg-opacity-50 relative">
      <HeroBgImage />
      <div className="w-14 sm:mx-auto sm:w-16">
        <Logo />
      </div>

      <div className="border-l-2 border-neutral pl-2  mt-6 sm:mx-auto sm:grid sm:grid-cols-2 sm:border-none sm:justify-center sm:items-center">
        <div className="sm:h-[480px] sm:px-2 sm:border-l-2 sm:border-neutral sm:col-start-2 sm:relative">
          <h1 className="text-[32px] font-medium sm:w-fit  sm:text-5xl   sm:absolute sm:top-1/2 sm:-translate-y-1/2">
            Revitalize
            <br />
            with Nature&apos;s
            <br />
            Touch
          </h1>
        </div>
        <p className=" mt-4 sm:w-fit sm:text-right sm:px-2 sm:col-start-1 sm:row-start-1 sm:ml-auto sm:text-2xl sm:mt-0">
          Discover
          <br />
          the Power of Neem
          <br />
          in Skincare
        </p>
      </div>

      <Link
        href="/"
        className="block w-fit py-4 px-5 border-2 border-neutral rounded-full mt-6 hover:bg-neutral hover:text-primary transition-colors duration-500 ease-in-out sm:mx-auto"
      >
        Explore Our Products
      </Link>
    </div>
  );
};

export default HeroSection;
