"use client";
import React, { useState } from "react";
import MainTag from "../UIElements/Miscellaneous/MainTag";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import OrDivider from "./OrDivider";
import GoogleSignInButton from "./GoogleSignInButton";
import { useAppSelector } from "../app/hookes";
import { redirect } from "next/navigation";

const PageContent = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const isLogin = useAppSelector((store) => store.user.isLogin);

  if (isLogin) {
    redirect("/user");
  }

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <MainTag>
      <div className="max-w-[434px] mx-auto sm:text-center">
        {isSignIn ? (
          <SignIn openSignUp={toggleSignIn} />
        ) : (
          <SignUp openSignIn={toggleSignIn} />
        )}
        <OrDivider />
        <div className="flex flex-col gap-4 mt-9">
          <GoogleSignInButton />
        </div>
      </div>
    </MainTag>
  );
};

export default PageContent;
