import React, { ReactElement, ReactNode } from "react";
import OverLayerOption from "./OverLayerOption";

const SingleBtnOverLayerOption = ({
  children,
  closeFunction,
  title,
  mainFunction,
  btnText,
  show,
}: {
  children: ReactElement;
  closeFunction: Function;
  title: string;
  mainFunction: Function;
  btnText: string;
  show: boolean;
}) => {
  return (
    <OverLayerOption
      closeFunction={() => closeFunction()}
      show={show}
      title={title}
    >
      <>
        {children}
        <button
          className="px-4 py-1.5 mt-3 bg-primary hover:bg-opacity-50 text-neutral rounded-full"
          onClick={() => mainFunction()}
        >
          {btnText}
        </button>
      </>
    </OverLayerOption>
  );
};

export default SingleBtnOverLayerOption;
