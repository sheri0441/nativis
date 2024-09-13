import React, { ReactElement } from "react";
import OverLayerOption from "./OverLayerOption";

const NegDoubleBtnOverLayerOption = ({
  children,
  closeFunction,
  title,
  mainFunction,
  mainBtnText,
  secBtnText,
  secBtnFunction,
  show,
}: {
  children: ReactElement;
  closeFunction: Function;
  title: string;
  mainFunction: Function;
  mainBtnText: string;
  secBtnText: string;
  secBtnFunction: Function;
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
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="px-4 py-1.5 bg-danger   hover:bg-opacity-50 text-neutral rounded-full"
            onClick={() => mainFunction()}
          >
            {mainBtnText}
          </button>
          <button
            className="px-4 py-1.5 bg-primary hover:bg-opacity-50 text-neutral rounded-full"
            onClick={() => secBtnFunction()}
          >
            {secBtnText}
          </button>
        </div>
      </>
    </OverLayerOption>
  );
};

export default NegDoubleBtnOverLayerOption;
