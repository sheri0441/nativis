import React from "react";

const TextField = ({
  register,
  name,
  type,
}: {
  register: Object;
  name: string;
  type: string;
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden"
      >
        {name}
      </label>
      <input
        type={type}
        id={name}
        placeholder={name}
        className="placeholder:font-light bg-neutral border-2 border-primary rounded-full px-5 py-3 focus:outline-accent w-full placeholder:capitalize  font-light"
        {...register}
      />
    </div>
  );
};

export default TextField;
