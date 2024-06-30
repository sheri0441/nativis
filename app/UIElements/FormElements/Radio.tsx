import React, { ReactNode } from "react";
import style from "./Radio.module.css";

const Radio = ({
  children,
  value,
  register,
  id,
  extraStyle,
}: {
  children: ReactNode;
  value: string;
  register: object;
  id: string;
  extraStyle: string;
}) => {
  return (
    <div className={style.radio}>
      <input
        {...register}
        className="hidden "
        type="radio"
        id={id}
        value={value}
      />
      <label
        className={`cursor-pointer px-5 py-4 border-2 border-primary block rounded-full hover:bg-primary hover:text-neutral ${extraStyle}`}
        htmlFor={id}
      >
        {children}
      </label>
    </div>
  );
};

export default Radio;
