import React from "react";
import style from "./ErrorMessage.module.css";

const ErrorMessage = ({
  showError,
  message,
}: {
  showError: boolean;
  message: string;
}) => {
  return (
    <div
      className={`fixed top-0  left-1/2  -translate-y-1/4  bg-danger bg-opacity-90 text-neutral px-4 py-5 rounded-full  z-50 pointer-events-none  ${
        showError
          ? style.errorMessageOpen
          : message.length > 0
          ? style.errorMessageClose
          : style.errorMessageDefault
      }`}
    >
      <p className="text-center">{message}</p>
    </div>
  );
};

export default ErrorMessage;
