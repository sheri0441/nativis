"use client";
import React, { ReactNode, useEffect } from "react";
import { store } from "../app/store";
import { Provider } from "react-redux";
import axios from "axios";
import { login } from "../app/features/user/userSlice";
import { UserType } from "../utils/Interfaces";
import LoadingScreen from "./LoadingScreen/LoadingScreen";
import { setLoadingPage } from "../app/features/pageLoading/loadingSlice";
import { Poppins } from "next/font/google";
import { retrieveUserCart } from "../app/features/cart/cartSlice";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const ProviderWrapper = ({ children }: { children: ReactNode }) => {
  const verifyToken = async (token: string) => {
    let user;
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/user/verify",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status !== 200) {
        localStorage.removeItem("token");
        return;
      }

      user = response.data as UserType;
    } catch (error) {
      localStorage.removeItem("token");
    }

    if (!user) {
      localStorage.removeItem("token");
    } else {
      const { name, image, id, email, provider } = user;
      store.dispatch(login({ name, image, id, email, provider }));
      store.dispatch(retrieveUserCart());
    }

    store.dispatch(setLoadingPage(false));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verifyToken(token);
    } else {
      store.dispatch(setLoadingPage(false));
    }
  }, []);

  return (
    <Provider store={store}>
      <body className={`${poppins.className} bg-neutral`}>
        <LoadingScreen />
        {children}
      </body>
    </Provider>
  );
};

export default ProviderWrapper;
