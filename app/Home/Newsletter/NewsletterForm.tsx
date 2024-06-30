"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "@/app/UIElements/FormElements/SubmitButton";
import TextField from "@/app/UIElements/FormElements/TextField";

type Inputs = {
  email: string;
};

const NewsletterForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: {},
  });

  const toggleLoading = () => {
    setLoading((perv) => !perv);
  };

  const onSubmit = handleSubmit((data) => {
    setLoading(true);
    setTimeout(toggleLoading, 1000);
    console.log(data);
    reset();
  });
  return (
    <form
      className="text-center flex flex-col max-w-[423px] mx-auto mt-8 gap-6 sm:gap-8 "
      onSubmit={onSubmit}
    >
      <TextField
        name="email"
        register={{ ...register("email") }}
        type="email"
      />
      <SubmitButton
        loading={loading}
        text="Subscribe"
        extraStyle={"w-fit px-5 bg-neutral mx-auto"}
      />
    </form>
  );
};

export default NewsletterForm;
