"use client";
import React, { useState } from "react";

const ProductDescription = ({ text }: { text: string }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleText = () => {
    setShowMore(!showMore);
  };

  return (
    <p className="text-xs text-center opacity-70  text-primary sm:text-base lg:text-xl  mt-2 sm:mt-5 lg:mt-2 lg:text-left">
      {text.length > 190 ? (
        <>
          {showMore ? text : text.substring(0, 190)}
          <button
            className={`text-accent font-medium ml-1 hover:underline ${
              showMore ? "hidden" : ""
            }`}
            onClick={toggleText}
          >
            ...show more
          </button>
          <button
            className={`text-accent font-medium ml-1 hover:underline ${
              showMore ? "" : "hidden"
            }`}
            onClick={toggleText}
          >
            show less
          </button>
        </>
      ) : (
        text
      )}
    </p>
  );
};

export default ProductDescription;
