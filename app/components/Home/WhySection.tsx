"use client";

import React, { useEffect, useState } from "react";
import HomeSection from "./HomeSection";
import TimerButton from "./TimerButton";
import AnimationIllustrations from "./AnimationIllustrations";
import { Facial, Natural, Quality } from "@/app/UIElements/Illustrations";
import WhySectionCard from "./WhySectionCard";

const WhySection = () => {
  const [active, isActive] = useState<{
    nature: boolean;
    quality: boolean;
    wellbeing: boolean;
  }>({
    nature: true,
    quality: false,
    wellbeing: false,
  });

  const toggleActive = () => {
    if (active.nature === true) {
      isActive({ quality: true, nature: false, wellbeing: false });
    } else if (active.quality === true) {
      isActive({ nature: false, quality: false, wellbeing: true });
    } else {
      isActive({ quality: false, nature: true, wellbeing: false });
    }
  };

  // Write a function so that on button press you can get the slide you want

  useEffect(() => {
    const timer = setInterval(toggleActive, 10000);

    return () => clearInterval(timer);
  }, [active]);

  return (
    <HomeSection
      title="Why Choose Nativis?"
      subtitle="Experience the Difference of Natural Beauty Solutions"
    >
      <div className="flex items-center flex-col mx-auto gap-4 w-fit mt-4 sm:flex-row sm:mt-5 lg:mt-7">
        <TimerButton
          clickEvent={() => toggleActive()}
          isActive={active.nature}
          innerText="Natural Beauty"
        />
        <TimerButton
          clickEvent={() => toggleActive()}
          isActive={active.quality}
          innerText="Trusted Quality"
        />
        <TimerButton
          clickEvent={() => toggleActive()}
          isActive={active.wellbeing}
          innerText="Well-being"
        />
      </div>
      <div className="relative">
        <WhySectionCard
          title="Natural Beauty"
          description="Experience the difference with Nativis' natural skincare solutions,
            meticulously crafted with the power of neem for radiant, healthy
            skin."
          isActive={active.nature}
        >
          <Natural />
        </WhySectionCard>
        <WhySectionCard
          title="Trusted Quality"
          description="Our products are formulated with high-quality ingredients and backed by years of research, ensuring effective results you can trust."
          isActive={active.quality}
        >
          <Quality />
        </WhySectionCard>
        <WhySectionCard
          title="Your Skin's Well-being"
          description="At Nativis, we're dedicated to providing your skin with the care it deserves, delivering gentle yet powerful skincare solutions that promote overall skin health."
          isActive={active.wellbeing}
        >
          <Facial />
        </WhySectionCard>
      </div>
    </HomeSection>
  );
};

export default WhySection;
