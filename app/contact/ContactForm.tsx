"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "../UIElements/FormElements/TextField";
import TextArea from "../UIElements/FormElements/TextArea";
import SubmitButton from "../UIElements/FormElements/SubmitButton";

type Inputs = {
  name: string;
  email: string;
  message: string;
};

const ContactForm = () => {
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
    <div>
      <h2 className="text-center font-medium text-xl mt-4 sm:text-2xl sm:mt-1 lg:text-[2rem] lg:mt-2">
        Send us a message
      </h2>
      <form
        className="max-w-[328px] sm:mx-auto lg:max-w-[424px] mx-auto flex flex-col gap-4 mt-4 lg:mt-6 select-none "
        onSubmit={onSubmit}
      >
        <TextField register={{ ...register("name") }} name="name" type="text" />
        <TextField
          register={{ ...register("email") }}
          name="email"
          type="email"
        />
        <TextArea register={{ ...register("message") }} name="message" />
        <SubmitButton
          loading={loading}
          text="send"
          extraStyle={"w-fit px-5  ml-auto"}
        />
      </form>
    </div>
  );
};

export default ContactForm;
