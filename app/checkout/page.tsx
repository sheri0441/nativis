"use client";
import React, { useState } from "react";
import { Metadata } from "next";
import MainTag from "../UIElements/Miscellaneous/MainTag";
import PageTitle from "../UIElements/Miscellaneous/PageTitle";
import CartItem from "../components/CartItem";
import TextField from "../UIElements/FormElements/TextField";
import { useForm } from "react-hook-form";
import TextArea from "../UIElements/FormElements/TextArea";
import Radio from "../UIElements/FormElements/Radio";
import { FlashTruckIcon, TruckIcon } from "../utils/Icons";
import SubmitButton from "../UIElements/FormElements/SubmitButton";

export const metadata: Metadata = {
  title: "Checkout | Nativis",
  description: "Thousand of Blogs to get education about your self",
};

type Inputs = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  delivery: "express" | "standard";
  Instructions?: string;
};

const Page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, handleSubmit, watch } = useForm<Inputs>({
    defaultValues: {
      delivery: "express",
    },
  });

  const toggleLoading = () => {
    setIsLoading((prev) => !prev);
  };

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    setTimeout(toggleLoading, 2000);
    console.log(data);
  });

  return (
    <MainTag>
      <PageTitle>Checkout</PageTitle>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
        <div className="lg:col-span-2">
          <h2 className="text-xl sm:text-2xl lg:text-[2rem] font-medium text-center lg:text-left">
            Summary
          </h2>
          <div>
            <div className="border-b border-b-primary py-6 lg:py-8">
              <CartItem colorReverse={true} />
            </div>
            <div className="ml-auto w-fit grid grid-cols-2 gap-x-2 text-right font-medium capitalize">
              <span>Sub-total:</span>
              <span>50$</span>
              <span>Shipping:</span>
              <span>00$</span>
              <span>total:</span>
              <span>00$</span>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-[2rem] font-medium text-center lg:text-left">
            Shipping Info
          </h2>
          <form
            className="max-w-96 mx-auto grid gap-4 mt-4"
            onSubmit={onSubmit}
          >
            <TextField
              name="name"
              register={{ ...register("name") }}
              type="text"
            />
            <TextField
              name="email"
              register={{ ...register("email") }}
              type="email"
            />
            <TextField
              name="phone number"
              register={{ ...register("phone") }}
              type="tel"
            />
            <TextField
              name="address"
              register={{ ...register("address") }}
              type="text"
            />
            <TextField
              name="city"
              register={{ ...register("city") }}
              type="text"
            />
            <TextField
              name="pin code"
              register={{ ...register("pincode") }}
              type="text"
            />
            <div className="grid gap-3">
              <h3 className="font-medium sm:text-xl lg:text-2xl text-center lg:text-left">
                Delivery
              </h3>
              <div>
                <Radio
                  value="standard"
                  id="delivery_standard"
                  register={{ ...register("delivery") }}
                  extraStyle="h-[52px] group flex justify-between items-center"
                >
                  <TruckIcon
                    style={` w-fit ${
                      watch("delivery") === "standard"
                        ? "fill-neutral group-hover:fill-neutral"
                        : "fill-primary group-hover:fill-neutral"
                    }`}
                  />
                  Standard
                  <span className="font-medium">+00</span>
                </Radio>
                <span className="text-xs block text-center">
                  Deliver within 14 days
                </span>
              </div>
              <div>
                <Radio
                  value="express"
                  id="delivery_express"
                  register={{ ...register("delivery") }}
                  extraStyle="h-[52px] group flex justify-between items-center "
                >
                  <FlashTruckIcon
                    style={` w-fit ${
                      watch("delivery") === "express"
                        ? "fill-neutral group-hover:fill-neutral"
                        : "fill-primary group-hover:fill-neutral"
                    }`}
                  />
                  Express
                  <span className="font-medium">+20</span>
                </Radio>
                <span className="text-xs block text-center">
                  Deliver within 7 days
                </span>
              </div>
            </div>
            <TextArea
              name="Instructions"
              register={{ ...register("Instructions") }}
            />
            <SubmitButton extraStyle="" loading={isLoading} text="Confirm" />
          </form>
        </div>
      </div>
    </MainTag>
  );
};

export default Page;
