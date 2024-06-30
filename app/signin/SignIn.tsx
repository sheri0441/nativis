"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "../UIElements/FormElements/TextField";
import SubmitButton from "../UIElements/FormElements/SubmitButton";
import Link from "next/link";
import OrDivider from "./OrDivider";

type Inputs = {
  email: string;
  password: string;
};

const SignIn = ({ openSignUp }: { openSignUp: Function }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: {},
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
    <div>
      <h1 className="text-5xl font-medium">Sign In</h1>
      <h2 className="text-xl mt-2 ">Welcome Back</h2>
      <form className="flex flex-col gap-4 mt-4" onSubmit={onSubmit}>
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
        <SubmitButton extraStyle="w-full" loading={isLoading} text="Sign In" />
      </form>
      <Link
        className="block text-center underline opacity-55 text-primary hover:opacity-100 mt-4"
        href={"/"}
      >
        Forget Password?
      </Link>
      <OrDivider />
      <div className="flex flex-col gap-4 mt-9">
        <button className="text-center bg-primary text-neutral w-full block py-3 rounded-full hover:bg-accent">
          Google
        </button>
        <button className="text-center bg-primary text-neutral w-full block py-3 rounded-full hover:bg-accent">
          Facebook
        </button>
      </div>
      <button
        className="font-medium text-xl mt-8 block mx-auto text-primary hover:underline"
        onClick={() => openSignUp()}
      >
        Don't have an account?
      </button>
    </div>
  );
};

export default SignIn;
