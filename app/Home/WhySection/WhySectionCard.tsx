import React, { ReactNode } from "react";
import AnimationIllustrations from "../../components/AnimationIllustrations";

const WhySectionCard = ({
  children,
  title,
  description,

  isActive,
}: {
  children: ReactNode;
  title: string;
  description: string;

  isActive: boolean;
}) => {
  return (
    <div
      className={`w-full mx-auto px-4 sm:px-0  sm:grid-cols-2 items-center max-w-[880px] mt-3 sm:mt-10 transition-opacity duration-500 ease-in opacity-0  sm:grid ${
        isActive && "opacity-100"
      }
      `}
    >
      <AnimationIllustrations>{children}</AnimationIllustrations>
      <div className="text-center px-4 sm:text-left sm:col-start-1 sm:row-start-1 sm:px-0 mt-4 sm:mt-0">
        <h3 className="text-2xl text-primary lg:text-[32px]">{title}</h3>
        <p className="text-secondary opacity-70 leading-5 sm:mt-6 lg:text-xl">
          {description}
        </p>
      </div>
    </div>
  );
};

export default WhySectionCard;
