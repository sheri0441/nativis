"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import heroImage from "../../assets/heroBgImage.jpg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const HeroBgImage = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const heroBg = document.getElementById("heroBg");

    gsap.to(heroBg, {
      scrollTrigger: {
        trigger: heroBg,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      scale: 2,
      ease: "power2.out",
    });
  }, []);

  return (
    <div className="absolute top-0 left-0 inset-0 object-cover -z-10 h-full overflow-hidden">
      <Image
        src={heroImage}
        alt="hero background image"
        className=" inset-0 object-cover object-center h-full"
        id="heroBg"
      />
    </div>
  );
};

export default HeroBgImage;
