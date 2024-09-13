"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import bg from "../../assets/newsletterBg.jpg";
import { useAppSelector } from "@/app/app/hookes";

const Banner = ({ title, body }: { title: string; body: string }) => {
  const isLogin = useAppSelector((store) => store.user.isLogin);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const newsletterbg = document.getElementById("newsletterBg");

    gsap.to(newsletterbg, {
      scrollTrigger: {
        trigger: newsletterbg,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
      objectPosition: "0% 0%",
    });
  }, []);
  return (
    !isLogin && (
      <div
        className="mt-8 py-8 sm:mt-16 sm:py-10 lg:mt-20 bg-primary bg-opacity-90 text-neutral relative overflow-hidden"
        id="newsletter"
      >
        <div
          className="absolute -z-10 bottom-0 left-0 inset-0  overflow-hidden"
          id=""
        >
          <Image
            className="w-full h-full object-cover object-bottom "
            id="newsletterBg"
            src={bg}
            alt=""
          />
        </div>
        <div className="container px-4 sm:max-w-[504px] lg:max-w-full mx-auto flex  flex-col items-center gap-2 sm:gap-3 lg:gap-4">
          <h2 className="text-2xl font-medium text-center sm:text-[2rem] lg:text-[2.5rem]">
            {title}
          </h2>
          <p className="text-center opacity-50">{body}</p>
          <a
            className="rounded-full px-4 py-3 border border-neutral hover:bg-neutral hover:text-primary text-neutral transition-colors ease block w-fit"
            href="/signin"
          >
            Sign Up
          </a>
        </div>
      </div>
    )
  );
};

export default Banner;
