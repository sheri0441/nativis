"use client";
import React, { ReactElement } from "react";
import style from "./OverLayerOption.module.css";

const OverLayerOption = ({
  show,
  children,
  closeFunction,
  title,
}: {
  show: boolean;
  children: ReactElement;
  closeFunction: Function;
  title: string;
}) => {
  return (
    <div
      className={`fixed top-0 bottom-0 left-0 right-0 z-50 flex justify-center items-center transition-opacity duration-500 ease-in-out   ${
        show
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } ${show && style.overlayeroption}`}
    >
      <div
        className="bg-primary bg-opacity-75 absolute top-0 bottom-0 left-0 right-0 z-40"
        onClick={() => closeFunction()}
      ></div>
      <div className="bg-neutral rounded-xl py-5 px-5 z-50 text-center ">
        <h3 className="font-medium text-accent">{title}</h3>
        {children}
      </div>
    </div>
  );
};

export default OverLayerOption;
