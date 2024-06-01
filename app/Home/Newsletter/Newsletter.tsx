"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import bg from "../../assets/newsletterBg.jpg";
import NewsletterForm from "./NewsletterForm";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Newsletter = () => {
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
      <div className="container px-4 sm:max-w-[504px] lg:max-w-full mx-auto">
        <h2 className="text-2xl font-medium text-center sm:text-[2rem] lg:text-[2.5rem]">
          Our Newsletter
        </h2>
        <p className="text-center sm:mt-2 lg:mt-3 opacity-50">
          Sign up to receive exclusive offers, skincare tips, and the latest
          news from Nativis.
        </p>
        <NewsletterForm />
      </div>
    </div>
  );
};

export default Newsletter;
