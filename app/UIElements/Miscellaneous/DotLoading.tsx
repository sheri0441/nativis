import React from "react";
import style from "./DotLoading.module.css";

const DotLoading = ({ size }: { size?: string }) => {
  return (
    <div
      className={`${
        size ? size : "*:w-1 *:h-1"
      }  *:bg-neutral *:rounded-full flex gap-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
        style.scalingAnimation
      }`}
    >
      <div></div>
      <div></div>
    </div>
  );
};

export default DotLoading;
