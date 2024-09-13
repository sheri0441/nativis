"use client";
import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/hookes";
import SubmitButton from "../UIElements/FormElements/SubmitButton";
import { login } from "../app/features/user/userSlice";
import { clearCart, retrieveUserCart } from "../app/features/cart/cartSlice";
import SingleBtnOverLayerOption from "../UIElements/Miscellaneous/SingleBtnOverLayerOption";
import ErrorMessage from "../UIElements/Miscellaneous/ErrorMessage";

const GoogleSignInButton = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<{
    error: boolean;
    message: string;
  }>({
    error: false,
    message: "",
  });
  const dispatch = useAppDispatch();
  const cartList = useAppSelector((store) => store.cart);
  const [addCartToUser, setAddCartToUser] = useState<boolean>(false);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);

  const closeErrorMessage = () => {
    setHasError({ error: false, message: "" });
    setIsLoading(false);
  };

  const raiseError = (text: string) => {
    setHasError({ error: true, message: text });
    setTimeout(closeErrorMessage, 3000);
  };

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    if (cartList.cart.length > 0 && !addCartToUser) {
      setShowPopUp(true);
      setIsLoading(false);
      return;
    }

    let result;

    try {
      result = await signInWithPopup(auth, provider);
    } catch (error) {
      raiseError("There is some error with the server.");
      return;
    }
    setIsLoading(true);

    let user;

    try {
      const response = await axios.post("./api/user/google", {
        email: result.user.email,
        name: result.user.displayName,
        id: result.user.uid,
        image: result.user.photoURL,
        provider: result.providerId,
      });

      user = response.data;
    } catch (error) {
      raiseError("There is some error with the server.");
      return;
    }

    const token = await result.user.getIdToken();

    const { name, image, email, cart, id, provider: providedId } = user;

    localStorage.setItem("token", token);

    dispatch(login({ name, image, email, id, providedId }));

    dispatch(clearCart());

    dispatch(retrieveUserCart());

    setIsLoading(false);
  };

  const handlePopUpClose = () => {
    setShowPopUp(false);
    signInWithGoogle();
  };

  return (
    <>
      <SingleBtnOverLayerOption
        btnText="OK!"
        closeFunction={handlePopUpClose}
        mainFunction={handlePopUpClose}
        show={showPopUp}
        title="Clean Cart"
      >
        <p>The cart items in your current will be deleted.</p>
      </SingleBtnOverLayerOption>
      <ErrorMessage message={hasError.message} showError={hasError.error} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signInWithGoogle();
        }}
      >
        <SubmitButton extraStyle="w-full" loading={isLoading} text="Google" />
      </form>
    </>
  );
};

export default GoogleSignInButton;
