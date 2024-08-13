import React from "react";

const PopUp = ({
  showPopUp,
  closePopUp,
  mainFunction,
  title,
  body,
  mainButtonText,
  secondaryButtonText,
}: {
  showPopUp: boolean;
  closePopUp: () => void;
  mainFunction: () => void;
  title: string;
  body: string;
  mainButtonText: string;
  secondaryButtonText: string;
}) => {
  return (
    <div
      className={`absolute top-0 left-0 inset-0 bg-primary z-50 bg-opacity-50 ${
        showPopUp ? "opacity-100 " : "opacity-0 pointer-events-none w-0 h-0"
      }`}
    >
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2  bg-neutral border border-accent rounded-md delay-100  py-4 px-5 flex flex-col gap-3 transition-all duration-500 ease-in-out max-w-[300px] ${
          showPopUp
            ? "opacity-100 -translate-y-1/2"
            : "opacity-0 -translate-y-2/3"
        }`}
      >
        <h2 className="text-2xl text-center font-medium">{title}</h2>
        <p className="opacity-75 text-center capitalize">{body}</p>
        <div className="ml-auto w-fit flex gap-2">
          <button
            className="bg-primary hover:bg-accent text-neutral rounded-full px-3 py-1"
            onClick={mainFunction}
          >
            {mainButtonText}
          </button>
          <button
            className="bg-danger hover:bg-opacity-75 text-neutral rounded-full px-3 py-1"
            onClick={closePopUp}
          >
            {secondaryButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
