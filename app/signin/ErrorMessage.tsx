import React from "react";

const ErrorMessage = ({
  showError,
  message,
}: {
  showError: boolean;
  message: string;
}) => {
  return (
    <div
      className={`absolute top-1/4 left-1/2 -translate-x-1/2  bg-danger text-neutral px-4 py-5 rounded-full transition-all duration-500 ease-in-out ${
        showError
          ? "opacity-100 -translate-y-1/2"
          : "opacity-0 -translate-y-full"
      }`}
    >
      <p className="text-center">{message}</p>
    </div>
  );
};

export default ErrorMessage;
