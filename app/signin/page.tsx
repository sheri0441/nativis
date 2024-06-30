"use client";
import React, { useState } from "react";
import MainTag from "../UIElements/Miscellaneous/MainTag";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const Page = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <MainTag>
      <div>
        <div className="hidden sm:block"></div>
        <div className="max-w-[434px] mx-auto sm:text-center">
          {isSignIn ? (
            <SignIn openSignUp={toggleSignIn} />
          ) : (
            <SignUp openSignIn={toggleSignIn} />
          )}
        </div>
      </div>
    </MainTag>
  );
};

export default Page;
