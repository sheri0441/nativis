import React from "react";

const TextArea = ({ register, name }: { register: Object; name: string }) => {
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
      ></textarea>
    </div>
  );
};

export default TextArea;
