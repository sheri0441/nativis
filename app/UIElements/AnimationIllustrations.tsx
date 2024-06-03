import React, { ReactNode } from "react";
import "./Animationillustraion.css";

const AnimationIllustrations = ({
  children,
  isSquare = true,
}: {
  children: ReactNode;
  isSquare?: boolean;
}) => {
  return (
    <div
      className={`w-full mx-auto sh_illustration_animation ${
        isSquare ? "*:aspect-square" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default AnimationIllustrations;
