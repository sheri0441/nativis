"use client";
import React, { useEffect, useState } from "react";
import HomeSection from "./HomeSection";
import TimerButton from "./TimerButton";
import { Facial, Natural, Quality } from "@/app/UIElements/Illustrations";
import WhySectionCard from "./WhySectionCard";

const WhySection = () => {
  const [showSlide, setShowSlide] = useState<number>(1);

  const toggleSlide = (number?: 1 | 2 | 3) => {
    console.log("toggleslide");
    console.log(number);

    if (number !== undefined) {
      setShowSlide(number);
      return;
    } else {
      console.log("toggleSlide else");

      setShowSlide((pervSlide) => {
        console.log(pervSlide);

        if (pervSlide < 3) {
          console.log(pervSlide);

          return pervSlide + 1;
        } else {
          return 1;
        }
      });
      return;
    }
  };

  useEffect(() => {
    const whySectionContent = document?.getElementById("whySectionContent");
    console.log(whySectionContent);

    whySectionContent!.scrollLeft =
      (whySectionContent!.scrollWidth / 3) * (showSlide - 1);

    const timer = setInterval(toggleSlide, 10000);

    return () => clearInterval(timer);
  }, [showSlide]);

  return (
    <HomeSection
      title="Why Choose Nativis?"
      subtitle="Experience the Difference of Natural Beauty Solutions"
    >
      <div className="flex items-center flex-col mx-auto gap-4 w-fit mt-4 sm:flex-row sm:mt-5 lg:mt-7">
        <TimerButton
          clickEvent={() => toggleSlide(1)}
          isActive={showSlide === 1}
          innerText="Natural Beauty"
        />
        <TimerButton
          clickEvent={() => toggleSlide(2)}
          isActive={showSlide === 2}
          innerText="Trusted Quality"
        />
        <TimerButton
          clickEvent={() => toggleSlide(3)}
          isActive={showSlide === 3}
          innerText="Well-being"
        />
      </div>
      <div
        className="grid grid-cols-[repeat(3,_100%)] sm:grid-cols-[repeat(3,_100%)] lg:grid-cols-[repeat(3,_100%)] overflow-hidden max-w-[880px] mx-auto "
        id="whySectionContent"
      >
        <WhySectionCard
          title="Natural Beauty"
          description="Experience the difference with Nativis natural skincare solutions,
            meticulously crafted with the power of neem for radiant, healthy
            skin."
          isActive={true}
        >
          <Natural />
        </WhySectionCard>
        <WhySectionCard
          title="Trusted Quality"
          description="Our products are formulated with high-quality ingredients and backed by years of research, ensuring effective results you can trust."
          isActive={true}
        >
          <Quality />
        </WhySectionCard>
        <WhySectionCard
          title="Your Skin's Well-being"
          description="At Nativis, we're dedicated to providing your skin with the care it deserves, delivering gentle yet powerful skincare solutions that promote overall skin health."
          isActive={true}
        >
          <Facial />
        </WhySectionCard>
      </div>
    </HomeSection>
  );
};

export default WhySection;
