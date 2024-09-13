import React from "react";

const TextArea = ({
  register,
  name,
  changeHandler,
}: {
  register: Object;
  name: string;
  changeHandler: Function;
}) => {
  return (
    <div>
      <label
        className="absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden"
        htmlFor={name}
      >
        {name}
      </label>
      <textarea
        className="placeholder:font-light bg-neutral border-2 border-primary px-5 py-3 focus:outline-accent w-full placeholder:capitalize rounded-[20px] font-light "
        name={name}
        id={name}
        rows={3}
        placeholder={name}
        {...register}
        onChange={(e) => changeHandler(e)}
      ></textarea>
    </div>
  );
};

export default TextArea;
