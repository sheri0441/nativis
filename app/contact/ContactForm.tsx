"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "../UIElements/FormElements/TextField";
import TextArea from "../UIElements/FormElements/TextArea";
import SubmitButton from "../UIElements/FormElements/SubmitButton";
import ErrorMessage from "../UIElements/Miscellaneous/ErrorMessage";
import { contactForm } from "../utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

type Inputs = {
  name: string;
  email: string;
  message: string;
};

const ContactForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(contactForm),
  });
  const [error, setError] = useState<{ hasError: boolean; message: string }>({
    hasError: false,
    message: "",
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const url = process.env.NEXT_PUBLIC_BASE_URL + "/api";
      const response = await axios.post(url, {
        data,
      });

      if ((response.status = 201)) {
        reset();
      } else {
        setError({ hasError: true, message: response.data.message });
      }
    } catch (error) {
      setError({
        hasError: true,
        message: "There is some error. Please try again.",
      });
    }
    setLoading(false);
  });

  const closeErrorDialog = () => {
    setError((perv) => (perv = { ...perv, hasError: false }));
  };

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 300) {
      setValue("message", e.target.value);
    } else {
      setValue("message", getValues("message"));
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstProperty: keyof Inputs = Object.keys(
        errors
      )[0] as keyof Inputs;
      const firstPropertyMessage = errors[firstProperty]!.message;
      setError({ hasError: true, message: firstPropertyMessage || "" });
    }
  }, [errors, watch]);

  useEffect(() => {
    setTimeout(closeErrorDialog, 5000);
  }, [error.hasError]);

  return (
    <>
      <ErrorMessage message={error.message} showError={error.hasError} />
      <div>
        <h2 className="text-center font-medium text-xl mt-4 sm:text-2xl sm:mt-1 lg:text-[2rem] lg:mt-2">
          Send us a message
        </h2>
        <form
          className="max-w-[328px] sm:mx-auto lg:max-w-[424px] mx-auto flex flex-col gap-4 mt-4 lg:mt-6 select-none "
          onSubmit={onSubmit}
        >
          <TextField
            register={{ ...register("name") }}
            name="name"
            type="text"
            hasError={!!errors.name}
          />
          <TextField
            register={{ ...register("email") }}
            name="email"
            type="email"
            hasError={!!errors.name}
          />
          <div>
            <TextArea
              register={{ ...register("message") }}
              name="message"
              changeHandler={changeHandler}
            />
            <span className="absolute">
              {watch("message") ? watch("message").length : 0}/300
            </span>
          </div>
          <SubmitButton
            loading={loading}
            text="send"
            extraStyle={"w-fit px-5  ml-auto"}
          />
        </form>
      </div>
    </>
  );
};

export default ContactForm;
