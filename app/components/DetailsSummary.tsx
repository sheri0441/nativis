"use client";
import React, { useState } from "react";
import { MinusIcon, PlusIcon } from "../utils/Icons";

const DetailsSummary = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <div
      className="py-3 px-5 bg-primary bg-opacity-25 rounded-3xl mt-5 cursor-pointer hover:bg-accent hover:text-neutral group transition-all duration-200 select-none ease-in-out"
      onClick={() => setShow((per) => !per)}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-medium">{question}</h3>
        <div className="w-5 h-5 bg-primary px-1 rounded-full group-hover:bg-neutral transition-all duration-200 ease-in-out flex justify-center items-center">
          {show ? (
            <MinusIcon
              style={`transition-all duration-200 ease-in-out fill-neutral group-hover:fill-primary`}
            />
          ) : (
            <PlusIcon
              style={`group-hover:fill-primary transition-all fill-neutral duration-200 ease-in-out`}
            />
          )}
        </div>
      </div>

      <p
        className={`${
          show ? " h-56 sm:h-32" : "h-0"
        } overflow-hidden transition-[height] duration-200 ease-in-out`}
      >
        {answer}
      </p>
    </div>
  );
};

export default DetailsSummary;
