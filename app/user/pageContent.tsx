"use client";
import React, { useEffect, useState } from "react";
import MainTag from "../UIElements/Miscellaneous/MainTag";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../app/hookes";
import { redirect } from "next/navigation";
import { convertDateToString, logOut } from "../app-lib";
import axios from "axios";
import { OrderCard } from "../utils/Interfaces";
import OverLayerOption from "../UIElements/Miscellaneous/OverLayerOption";
import ErrorMessage from "../UIElements/Miscellaneous/ErrorMessage";
import NegDoubleBtnOverLayerOption from "../UIElements/Miscellaneous/NegDoubleBtnOverLayerOption";

const PageContent = () => {
  const user = useAppSelector((store) => store.user);
  if (!user.isLogin) {
    redirect("/signin");
  }
  const dispatch = useAppDispatch();
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [logOutDialog, setLogOutDialog] = useState<boolean>(false);
  const [error, setError] = useState<{ hasError: boolean; message: string }>({
    hasError: false,
    message: "",
  });
  const [orderList, setOrderList] = useState<OrderCard[]>([]);
  const [orderError, setOrderError] = useState<{
    hasError: boolean;
    message: string;
  }>({
    hasError: false,
    message: "",
  });

  const closeDeleteDialog = () => {
    setDeleteDialog(false);
  };
  const closeLogOutDialog = () => {
    setLogOutDialog(false);
  };

  const deleteAccount = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/user";
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        dispatch(logOut);
      } else {
        setError({
          hasError: true,
          message: response.data.message,
        });
      }
    } catch (error) {
      setError({
        hasError: true,
        message: "There is some issue in the server.",
      });
    }
  };

  const fetchOrderHistory = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/order";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        setOrderList(response.data);
      } else {
        setOrderError({ hasError: true, message: response.data.message });
      }
    } catch (error) {
      setOrderError({
        hasError: true,
        message: "Due to some error order history is not fetched.",
      });
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  return (
    <MainTag>
      <ErrorMessage message={error.message} showError={error.hasError} />

      <NegDoubleBtnOverLayerOption
        closeFunction={closeDeleteDialog}
        mainBtnText="Yes!"
        mainFunction={deleteAccount}
        secBtnFunction={closeDeleteDialog}
        secBtnText="Cancel"
        show={deleteDialog}
        title="Delete Account"
        key={Math.random()}
      >
        <p>Are you sure, you want to delete the account?</p>
      </NegDoubleBtnOverLayerOption>
      <NegDoubleBtnOverLayerOption
        closeFunction={closeLogOutDialog}
        mainBtnText="LogOut"
        mainFunction={() => dispatch(logOut)}
        secBtnFunction={closeLogOutDialog}
        secBtnText="Cancel"
        show={logOutDialog}
        title="LogOut"
        key={Math.random()}
      >
        <p>Are you sure, you want to LogOut?</p>
      </NegDoubleBtnOverLayerOption>
      <div className="mx-auto sm:flex w-fit sm:gap-6">
        <div className="w-96 aspect-square overflow-hidden rounded sm:rounded-md lg:rounded-lg">
          <Image
            className="w-full h-full object-cover object-center"
            src={user.image || ""}
            alt=""
            height={1000}
            width={1000}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <span className="font-medium">Name</span>
            <p className="text-xl sm:text-2xl">{user.name}</p>
          </div>
          <div>
            <span className="font-medium">Email</span>
            <p className="text-xl sm:text-2xl">{user.email}</p>
          </div>
          <button
            className="py-3 border border-danger text-danger hover:bg-danger hover:text-neutral transition-colors duration-500 ease-in-out rounded-full capitalize"
            onClick={() => setDeleteDialog(true)}
          >
            delete account
          </button>
          <button
            className="py-3 border border-danger text-danger hover:bg-danger hover:text-neutral transition-colors duration-500 ease-in-out rounded-full capitalize"
            onClick={() => setLogOutDialog(true)}
          >
            Log Out
          </button>
        </div>
      </div>
      <div className="mt-5 sm:mt-8 lg:mt-10">
        <h2 className="text-xl sm:text-2xl lg:text-[2rem] font-medium text-center">
          Order History
        </h2>

        <table className="hidden sm:table overflow-scroll max-w-[880px] w-full mx-auto border border-primary rounded-md mt-5">
          <thead className="w-full">
            <tr className="w-full grid grid-cols-[20px_1fr_1fr_1fr_1fr] gap-1  p-4 bg-primary bg-opacity-75 text-neutral">
              <td>#</td>
              <td>Order Number</td>
              <td>Order Date</td>
              <td>Price</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody className="*:w-full *:grid *:grid-cols-[20px_1fr_1fr_1fr_1fr] *:gap-1  *:p-4 *:bg-neutral *:text-primary even:*:bg-secondary even:*:bg-opacity-25">
            {orderList && !orderError.hasError ? (
              orderList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.orderId}</td>
                    <td>{convertDateToString(item.date)}</td>
                    <td>${item.totalPrice}</td>
                    <td>{item.status}</td>
                  </tr>
                );
              })
            ) : orderError.hasError ? (
              <tr>
                <td className="col-span-5">{orderError.message}</td>
              </tr>
            ) : (
              <tr>
                <td className="col-span-5">
                  Either you haven&apos;t order yet or just need to refresh the
                  page.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <span className="text-center block">
          Its only shows the recent five order.
        </span>
      </div>
    </MainTag>
  );
};

export default PageContent;
