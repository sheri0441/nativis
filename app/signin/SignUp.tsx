"use client";
import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import TextField from "../UIElements/FormElements/TextField";
import SubmitButton from "../UIElements/FormElements/SubmitButton";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/hookes";
import { login } from "../app/features/user/userSlice";
import ErrorMessage from "./ErrorMessage";
import ImageUploadButton from "./ImageUploadButton";
import generateUniqueId from "generate-unique-id";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../utils/schema";
import { FirebaseError } from "firebase/app";
import { passwordStrength } from "check-password-strength";
import PopUp from "../UIElements/Miscellaneous/PopUp";
import {
  addProduct,
  addToUserData,
  clearCart,
  retrieveUserCart,
} from "../app/features/cart/cartSlice";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirm: string;
  image: string;
};

const SignUp = ({ openSignIn }: { openSignIn: Function }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<{ error: boolean; message: string }>(
    {
      error: false,
      message: "",
    }
  );
  const [previewImage, setPreviewImage] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const [strength, setStrength] = useState<{ id: number; value: string }>({
    id: 0,
    value: "Too Weak",
  });
  const cartList = useAppSelector((store) => store.cart);
  const [addCartToUser, setAddCartToUser] = useState<boolean>(false);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
    getValues,
  } = useForm<Inputs>({
    resolver: zodResolver(signUpSchema),
  });

  const imageId = generateUniqueId({ length: 10, useLetters: true });
  const fileRef = `user/${imageId}`;
  const storageRef = ref(storage, fileRef);

  const changeImage = async (e: any) => {
    const file = e.target.files[0];
    var url = URL.createObjectURL(file);
    setValue("image", url);
    setImage(file);
    setPreviewImage(url);
  };

  const raiseError = (message: string) => {
    setHasError({ error: true, message: message });
    setIsLoading(false);
    setTimeout(closeErrorDialog, 3000);
  };

  const onSubmit = handleSubmit(async (data: Inputs) => {
    setIsLoading(true);

    if (data.password !== data.confirm) {
      raiseError("password and confirm-password should be same.");
      setIsLoading(false);
      return;
    }

    if (strength.id === 0 || strength.id === 1) {
      raiseError("Password should be strong.");
      setIsLoading(false);
      return;
    }

    if (image === null) {
      raiseError("Please upload image.");
      setIsLoading(false);
      return;
    }

    if (cartList.cart.length > 0 && !addCartToUser) {
      setShowPopUp(true);
      setIsLoading(false);
      return;
    }

    try {
      await uploadBytes(storageRef, image);
    } catch (error) {
      if (error instanceof FirebaseError) {
        const text = error.code.split("/")[1].replaceAll("-", " ");
        raiseError(text);
      }
      return;
    }

    let user;

    try {
      user = await axios.post("./api/user/signup", {
        name: data.name,
        email: data.email,
        password: data.password,
        imageRef: fileRef,
      });

      if (user.status !== 201) {
        raiseError(user.data.message);
      }
    } catch (error) {
      raiseError("There is some server internal error.");
      return;
    }

    if (user) {
      const { name, email, id, image, token, provider, cart } = user.data;
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
    }

    dispatch(retrieveUserCart());

    setIsLoading(false);
    setPreviewImage("");
    reset();
  });

  const closeErrorDialog = () => {
    setHasError({ error: false, message: "" });
  };

  const handlePopUpClose = (shouldAddCart: boolean) => {
    setAddCartToUser(shouldAddCart);
    if (!shouldAddCart) {
      dispatch(clearCart());
    }
    setShowPopUp(false);
    const data = getValues();
    onSubmit(data as unknown as BaseSyntheticEvent);
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstProperty: keyof Inputs = Object.keys(
        errors
      )[0] as keyof Inputs;
      const firstPropertyMessage = errors[firstProperty]!.message;
      setHasError({ error: true, message: firstPropertyMessage || "" });
      setTimeout(closeErrorDialog, 3000);
    }
  }, [errors, watch]);

  useEffect(() => {
    const strength = passwordStrength(watch("password"));
    setStrength(strength);
  }, [watch("password")]);

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
      <h1 className="text-5xl font-medium">Sign Up</h1>
      <h2 className="text-xl mt-2 ">Join the Natural club</h2>
      <form className="flex flex-col gap-4 mt-4" onSubmit={onSubmit}>
        <TextField
          type="text"
          name="name"
          register={{ ...register("name") }}
          hasError={!!errors.name}
        />
        <TextField
          type="email"
          name="email"
          register={{ ...register("email", { required: true }) }}
          hasError={!!errors.email}
        />
        <TextField
          name="password"
          register={{ ...register("password", { required: true }) }}
          hasError={!!errors.password}
          type="password"
        />
        {watch("password") && watch("password").length > 0 && (
          <div>
            <div className="*:h-2 *:w-3  flex gap-2 *:rounded justify-center">
              <div className={`bg-accent`}></div>
              <div
                className={`${
                  strength.id !== 0 ? "bg-accent" : "bg-secondary bg-opacity-50"
                }`}
              ></div>
              <div
                className={`${
                  strength.id !== 0 && strength.id !== 1
                    ? "bg-accent"
                    : "bg-secondary bg-opacity-50"
                }`}
              ></div>
              <div
                className={`${
                  strength.id === 3 ? "bg-accent" : "bg-secondary bg-opacity-50"
                }`}
              ></div>
            </div>
            <span>{strength.value}</span>
          </div>
        )}
        <TextField
          name="confirm password"
          register={{ ...register("confirm", { required: true }) }}
          hasError={!!errors.confirm}
          type="password"
        />
        <ImageUploadButton
          hasError={!!errors.image}
          previewImage={previewImage}
          changeEvent={changeImage}
        />
        <SubmitButton extraStyle="w-full" loading={isLoading} text="Sign Up" />
      </form>
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
