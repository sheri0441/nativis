import React from "react";

import DotLoading from "../Miscellaneous/DotLoading";

const SubmitButton = ({
  text,
  extraStyle,
  loading,
}: {
  text: string;
  extraStyle: string;
  loading: boolean;
}) => {
  return (
    <button
      className={` bg-primary text-neutral capitalize font-medium py-3 rounded-full cursor-pointer sm:text-xl hover:bg-accent mt-0 block relative disabled:bg-opacity-50 disabled:hover:bg-primary disabled:hover:opacity-50 disabled:cursor-default border border-neutral ${extraStyle}`}
      type="submit"
      disabled={loading}
    >
      <span className={loading ? "opacity-0" : ""}>{text}</span>
      {loading && <DotLoading />}
    </button>
  );
};

export default SubmitButton;
