"use client";
import React, { useState } from "react";
import Image from "next/image";
import avataar from "../../../assets/avaatar.png";
import TextArea from "@/app/UIElements/FormElements/TextArea";
import SubmitButton from "@/app/UIElements/FormElements/SubmitButton";
import { useForm } from "react-hook-form";

type Inputs = {
  id: string;
  date: string;
  comment: string;
};

const UserCommentField = () => {
  const dateNow = () => {
    const month = [
      "jan",
      "feb",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];
    const date = new Date();

    return `${date.getDay()} ${month[
      date.getMonth() - 1
    ].toUpperCase()} ${date.getFullYear()}`;
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: {
      id: "1",
      date: dateNow(),
      comment: "",
    },
  });

  const toggleLoading = () => {
    setIsLoading((perv) => !perv);
  };

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    setTimeout(toggleLoading, 1000);
    console.log(data);
    reset();
  });

  return (
    <div className="flex flex-col gap-4 mt-5 sm:grid sm:grid-cols-[80px_auto] sm:items-start">
      <div className="flex items-center gap-2">
        <Image
          className="h-11 w-11 rounded-full sm:h-20 sm:w-20"
          src={avataar}
          alt=""
        />
        <div className="sm:hidden">
          <p className="font-medium ">Jane</p>
          <p className=" font-light text-xs">{dateNow()}</p>
        </div>
      </div>
      <div className="">
        <div className="hidden sm:flex sm:justify-between sm:items-center">
          <p className="font-medium ">Jane</p>
          <p className=" font-light text-xs">{dateNow()}</p>
        </div>
        <form className="flex flex-col gap-4 w-full" onSubmit={onSubmit}>
          <TextArea register={{ ...register("comment") }} name="comment" />
          <SubmitButton
            loading={isLoading}
            extraStyle="w-fit px-5 ml-auto"
            text="Submit"
          />
        </form>
      </div>
    </div>
  );
};

export default UserCommentField;
