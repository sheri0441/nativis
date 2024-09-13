"use client";
import React, { useEffect, useState } from "react";
import MainTag from "../UIElements/Miscellaneous/MainTag";
import PageTitle from "../UIElements/Miscellaneous/PageTitle";
import CartItem from "../components/CartItem";
import TextField from "../UIElements/FormElements/TextField";
import { useForm } from "react-hook-form";
import TextArea from "../UIElements/FormElements/TextArea";
import Radio from "../UIElements/FormElements/Radio";
import { FlashTruckIcon, TruckIcon } from "../utils/Icons";
import { useAppDispatch, useAppSelector } from "../app/hookes";
import {
  CartItemFetchType,
  CartItemType,
  OrderDetail,
} from "../utils/Interfaces";
import {
  calculateCartItemsPrice,
  fetchCartItemDetails,
  singleDigitToDouble,
} from "../app-lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingInfoSchema } from "../utils/schema";
import ErrorMessage from "../UIElements/Miscellaneous/ErrorMessage";
import axios, { AxiosError } from "axios";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { ZodError } from "zod";
import { cleanUserCartData, clearCart } from "../app/features/cart/cartSlice";
import { useRouter } from "next/navigation";
import SingleBtnOverLayerOption from "../UIElements/Miscellaneous/SingleBtnOverLayerOption";

const CheckoutLayout = ({
  cart,
  cartLoading,
  disableDelete = false,
}: {
  cart: CartItemType[];
  cartLoading: boolean;
  disableDelete?: boolean;
}) => {
  const [cartItems, setCartItems] = useState<CartItemFetchType[] | null>(null);
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const [subTotal, setSubTotal] = useState<number>(0);
  const [deliveryCharge, setDeliveryCharge] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();
  const [error, setError] = useState<{ hasError: boolean; text: string }>({
    hasError: false,
    text: "",
  });
  const isLogin = useAppSelector((store) => store.user.isLogin);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<OrderDetail>({
    resolver: zodResolver(shippingInfoSchema),
    defaultValues: {
      name: user.isLogin && user.name ? user.name : "",
      email: user.isLogin && user.email ? user.email : "",
      delivery: "standard",
      instructions: "",
      list: cart,
    },
  });

  // const toggleLoading = () => {
  //   setIsLoading((prev) => !prev);
  // };

  const fetchCartDetails = async () => {
    const cartList = await fetchCartItemDetails(cart);
    setCartItems(cartList.list);
  };

  const calculateSubTotal = (cartItems: CartItemFetchType[]) => {
    const productTotal = calculateCartItemsPrice(cartItems);
    setSubTotal(productTotal);
  };

  const closeErrorDialog = () => {
    setError((perv) => (perv = { hasError: false, text: perv.text }));
  };

  useEffect(() => {
    setTimeout(closeErrorDialog, 5000);
  }, [error.hasError]);

  useEffect(() => {
    fetchCartDetails();
    setValue("list", cart);
  }, [cart]);

  useEffect(() => {
    if (getValues("delivery") === "standard") {
      setDeliveryCharge((perv) => (perv = 0));
    } else {
      setDeliveryCharge((perv) => (perv = 20));
    }
  }, [watch("delivery"), getValues("delivery")]);

  useEffect(() => {
    if (cartItems !== null) {
      calculateSubTotal(cartItems);
    }
  }, [cartItems]);

  const mainFunction = () => {
    router.push("/");
  };

  return (
    <MainTag>
      <SingleBtnOverLayerOption
        btnText="Ok!"
        closeFunction={mainFunction}
        mainFunction={mainFunction}
        show={success}
        title="Success"
      >
        <p>Order Placed Successfully.</p>
      </SingleBtnOverLayerOption>
      <ErrorMessage showError={error.hasError} message={error.text} />
      <PageTitle>Checkout</PageTitle>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
        <div className="lg:col-span-2">
          <h2 className="text-xl sm:text-2xl lg:text-[2rem] font-medium text-center lg:text-left">
            Summary
          </h2>
          <div>
            <div className="border-b border-b-primary py-6 lg:py-8">
              {cartItems !== null ? (
                cartItems.map((item, index = 1) => (
                  <CartItem
                    key={`${item?.id}-${item.size}`}
                    colorReverse={index % 2 === 0}
                    product={item}
                    applyBgColorReverse={true}
                    isLoading={cartLoading}
                    disableDelete={disableDelete}
                  />
                ))
              ) : (
                <p>
                  There is no product in you cart please add product to your
                  cart.
                </p>
              )}
            </div>
            <div className="ml-auto w-fit grid grid-cols-2 gap-x-2 text-right font-medium capitalize">
              <span>Sub-total:</span>
              <span>{singleDigitToDouble(Number(subTotal.toFixed(2)))}$</span>
              <span>Shipping:</span>
              <span>{singleDigitToDouble(deliveryCharge)}$</span>
              <span>total:</span>
              <span>
                {singleDigitToDouble(
                  Number(subTotal.toFixed(2)) + deliveryCharge
                )}
                $
              </span>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-[2rem] font-medium text-center lg:text-left">
            Shipping Info
          </h2>
          <form className="max-w-96 mx-auto grid gap-4 mt-4">
            <TextField
              name="name"
              register={{ ...register("name") }}
              type="text"
              hasError={!!errors.name}
            />
            <TextField
              name="email"
              register={{ ...register("email") }}
              type="email"
              hasError={!!errors.email}
            />
            <TextField
              name="phone number"
              register={{ ...register("phone") }}
              type="tel"
              hasError={!!errors.phone}
            />
            <TextField
              name="address"
              register={{ ...register("address") }}
              type="text"
              hasError={!!errors.address}
            />
            <TextField
              name="city"
              register={{ ...register("city") }}
              type="text"
              hasError={!!errors.city}
            />
            <TextField
              name="pin code"
              register={{ ...register("zip") }}
              type="text"
              hasError={!!errors.zip}
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
            <div>
              <TextArea
                name="Instructions"
                register={{ ...register("instructions") }}
                changeHandler={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  if (e.target.value.length <= 100) {
                    setValue("instructions", e.target.value);
                  } else {
                    setValue("instructions", getValues("instructions"));
                  }
                }}
              />
              <span>{watch("instructions")!.length}/100</span>
            </div>
            <div className="bg-primary text-neutral p-4 rounded-3xl">
              <p>User following credentials</p>
              <p>4111111111111111, 11/26, 111, 12345</p>
            </div>
            <PaymentForm
              applicationId="sandbox-sq0idb-IQ89e5bM4pM-ZGtYIoU4qQ"
              cardTokenizeResponseReceived={async (token: {
                status: string;
                token: string;
              }) => {
                const data = getValues();
                try {
                  shippingInfoSchema.parse(data);
                } catch (error) {
                  if (error instanceof ZodError) {
                    setError({
                      hasError: true,
                      text: error.issues[0].message,
                    });
                  } else {
                    setError({
                      hasError: true,
                      text: "Unable to process the form please try again.",
                    });
                  }
                  return;
                }

                try {
                  const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/order";
                  const response = await axios.post(url, data, {
                    headers: {
                      Authorization: "Bearer " + token.token,
                    },
                  });

                  if (response.status === 201) {
                    reset();
                    if (!disableDelete) {
                      if (isLogin) {
                        dispatch(cleanUserCartData());
                      } else {
                        dispatch(clearCart());
                      }
                    }

                    setSuccess((perv) => (perv = true));
                  } else {
                    setError({
                      hasError: true,
                      text: response.data.message,
                    });
                  }
                } catch (error) {
                  if (error instanceof AxiosError) {
                    setError({
                      hasError: true,
                      text: error.message,
                    });
                  }
                }
              }}
              locationId="LE6CZHBQT99DT"
            >
              <CreditCard />
            </PaymentForm>
          </form>
        </div>
      </div>
      <div></div>
    </MainTag>
  );
};

export default CheckoutLayout;
