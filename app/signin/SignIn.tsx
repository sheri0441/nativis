"use client";
import React, { BaseSyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "../UIElements/FormElements/TextField";
import SubmitButton from "../UIElements/FormElements/SubmitButton";
import Link from "next/link";
import ErrorMessage from "./ErrorMessage";
import { useAppDispatch, useAppSelector } from "../app/hookes";
import { login } from "../app/features/user/userSlice";
import axios, { AxiosError } from "axios";
import PopUp from "../UIElements/Miscellaneous/PopUp";
import {
  addToUserData,
  clearCart,
  retrieveUserCart,
} from "../app/features/cart/cartSlice";
import { signInSchema } from "../utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";

type Inputs = {
  email: string;
  password: string;
};

const SignIn = ({ openSignUp }: { openSignUp: Function }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<{ error: boolean; message: string }>(
    {
      error: false,
      message: "",
    }
  );
  const dispatch = useAppDispatch();
  const cartList = useAppSelector((store) => store.cart);
  const [addCartToUser, setAddCartToUser] = useState<boolean>(false);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<Inputs>({
    resolver: zodResolver(signInSchema),
  });

  const closeErrorMessage = () => {
    setHasError({ error: false, message: "" });
    setIsLoading(false);
  };

  const raiseError = (text: string) => {
    setHasError({ error: true, message: text });
    setTimeout(closeErrorMessage, 3000);
  };

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    if (cartList.cart.length > 0 && !addCartToUser) {
      setShowPopUp(true);
      setIsLoading(false);
      return;
    }

    let user;
    try {
      const response = await axios.post("./api/user/signin", {
        email: data.email,
        password: data.password,
      });
      if (response.status !== 200) {
        raiseError(response.data.message);
        return;
      } else {
        user = response.data;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        raiseError(error.message);
      } else {
        raiseError("There is some error with the server. Please try again.");
      }
      return;
    }

    const { name, email, id, image, token, cart, provider } = user;

    localStorage.setItem("token", token);

    dispatch(
      login({
        name,
        email,
        image,
        id: id,
      })
    );

    if (addCartToUser) {
      dispatch(addToUserData(cartList.cart));
    }

    dispatch(retrieveUserCart());

    setIsLoading(false);
    reset();
  });

  const handlePopUpClose = (shouldAddCart: boolean) => {
    setAddCartToUser(shouldAddCart);
    if (!shouldAddCart) {
      dispatch(clearCart());
    }
    setShowPopUp(false);
    const data = getValues();
    onSubmit(data as unknown as BaseSyntheticEvent);
  };

  return (
    <div>
      <PopUp
        body="Would you like to add current cart list to your data? Or Clean the Cart list?"
        closePopUp={() => handlePopUpClose(false)}
        mainFunction={() => handlePopUpClose(true)}
        showPopUp={showPopUp}
        title="Cart "
        mainButtonText="Add"
        secondaryButtonText="Clear"
      />
      <ErrorMessage showError={hasError.error} message={hasError.message} />
      <h1 className="text-5xl font-medium">Sign In</h1>
      <h2 className="text-xl mt-2 ">Welcome Back</h2>
      <form className="flex flex-col gap-4 mt-4" onSubmit={onSubmit}>
        <TextField
          type="email"
          name="email"
          register={{ ...register("email") }}
          hasError={!!errors.email}
        />
        <TextField
          name="password"
          register={{ ...register("password") }}
          type="password"
          hasError={!!errors.password}
        />
        <SubmitButton extraStyle="w-full" loading={isLoading} text="Sign In" />
      </form>

      <Link
        className="block text-center underline opacity-55 text-primary hover:opacity-100 mt-4"
        href={"/"}
      >
        Forget Password?
      </Link>
      <button
        className="font-medium text-xl mt-8 block mx-auto text-primary hover:underline"
        onClick={() => openSignUp()}
      >
        Don&apos;t have an account?
      </button>
    </div>
  );
};

export default SignIn;
function getValues() {
  throw new Error("Function not implemented.");
}
