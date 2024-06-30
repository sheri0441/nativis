"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HeroBgImage = ({ imageLink }: { imageLink: string | any }) => {
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
    });
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full inset-0 object-cover -z-10 h-full overflow-hidden">
      <Image
        src={imageLink}
        alt={"hello"}
        className=" inset-0 w-full object-cover object-center h-full"
        id="heroBg"
        width={100}
        height={100}
      />
    </div>
  );
};

export default HeroBgImage;
