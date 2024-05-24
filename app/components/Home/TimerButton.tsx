import React from "react";
import style from "./TimerButton.module.css";

const TimerButton = ({
  isActive = false,
  innerText,
}: {
  isActive?: boolean;
  innerText: string;
}) => {
  return (
    <button
      className={`py-2 px-4 bg-neutral border rounded-full border-primary text-primary flex gap-2 items-center hover:bg-primary hover:text-neutral w-fit ${
        isActive && style.active
      }`}
    >
      <span className="w-5 block bg-accent aspect-square rounded-full"></span>
      {innerText}
    </button>
  );
};

export default TimerButton;
