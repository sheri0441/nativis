import React, { ReactNode } from "react";
import "./Animationillustraion.css";

const AnimationIllustrations = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`w-64 aspect-square sh_illustration_animation`}>
      {children}
    </div>
  );
};

export default AnimationIllustrations;
