"use client";
import React, { useState } from "react";
import TextField from "../UIElements/FormElements/TextField";
import SubmitButton from "../UIElements/FormElements/SubmitButton";
import { useForm } from "react-hook-form";
import OrDivider from "./OrDivider";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirm: string;
};

const SignUp = ({ openSignIn }: { openSignIn: Function }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: {},
  });

  const toggleLoading = () => {
    setIsLoading((perv: boolean) => !perv);
  };

  const onSubmit = handleSubmit((data: Inputs) => {
    setIsLoading(true);
    setTimeout(toggleLoading, 1000);
    console.log(data);
    reset();
  });
  return (
    <div>
      <h1 className="text-5xl font-medium">Sign Up</h1>
      <h2 className="text-xl mt-2 ">Join the Natural club</h2>
      <form className="flex flex-col gap-4 mt-4" onSubmit={onSubmit}>
        <TextField type="text" name="name" register={{ ...register("name") }} />
        <TextField
          type="email"
          name="email"
          register={{ ...register("email") }}
        />
        <TextField
          name="password"
          register={{ ...register("password") }}
          type="password"
        />
        <TextField
          name="confirm password"
          register={{ ...register("confirm") }}
          type="password"
        />
        <SubmitButton extraStyle="w-full" loading={isLoading} text="Sign Up" />
      </form>
      <OrDivider />
      <div className="flex flex-col gap-4 ">
        <button className="text-center bg-primary text-neutral w-full block py-3 rounded-full hover:bg-accent">
          Google
        </button>
        <button className="text-center bg-primary text-neutral w-full block py-3 rounded-full hover:bg-accent">
          Facebook
        </button>
      </div>
      <button
        className="font-medium text-xl mt-8 block mx-auto text-primary hover:underline"
        onClick={() => openSignIn()}
      >
        Have an account?
      </button>
    </div>
  );
};

export default SignUp;
