import React, { ReactNode } from "react";
import "./Animationillustraion.css";

const AnimationIllustrations = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={`w-full mx-auto sm:w-80 lg:w-[424px] aspect-square sh_illustration_animation`}
    >
      {children}
    </div>
  );
};

export default AnimationIllustrations;
