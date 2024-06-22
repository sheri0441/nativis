import React, { ReactNode } from "react";

const ProductQuantityButton = ({
  children,
  clickEvent,
}: {
  children: ReactNode;
  clickEvent: Function;
}) => {
  const changeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    clickEvent();
  };

  return (
    <button
      className="group bg-primary w-10 sm:w-12 aspect-square rounded-full p-3 hover:bg-accent"
      onClick={(e) => changeHandler(e)}
    >
      {children}
    </button>
  );
};

export default ProductQuantityButton;
