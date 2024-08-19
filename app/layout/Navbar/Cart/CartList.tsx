import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CrossIcon } from "@/app/utils/Icons";
import IconsBtn from "@/app/UIElements/Miscellaneous/IconsBtn";
import CartItem from "../../../components/CartItem";
import { useAppDispatch, useAppSelector } from "@/app/app/hookes";
import { toggleCart } from "@/app/app/features/navigation/navigationSlice";
import axios from "axios";
import { CartItemFetchType } from "@/app/utils/Interfaces";

const CartList = () => {
  const showCart = useAppSelector((store) => store.navigation.showCart);
  const cart = useAppSelector((store) => store.cart.cart);
  const dispatch = useAppDispatch();
  const [cartItems, setCartItems] = useState<CartItemFetchType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const fetchCartItemDetails = async () => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/products/cart",
        cart
      );
      setCartItems(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchCartItemDetails();
  }, [cart]);

  useEffect(() => {
    let total: number = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total += Number(cartItems[i].price) * cartItems[i].quantity;
    }
    setTotalPrice(total);
  }, [cartItems]);

  return (
    <div
      className={`fixed top-0 left-0  inset-0 bg-primary z-10 transition-all duration-500 ease-in-out h-screen ${
        !showCart && "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={
          "w-full max-w-[640px] text-center mx-auto mt-12 sm:mt-16 grid gap-4 grid-rows-custom-cart-layout "
        }
      >
        <span className="text-xl sm:text-3xl font-medium text-neutral uppercase row-start-1">
          Shopping Cart
        </span>
        <div className="w-full px-4 sm:px-0  mx-auto flex flex-col gap-3 max-h-[420px] overflow-y-scroll">
          {cartItems.length === 0 ? (
            <p className="text-neutral">Your cart is empty right now!</p>
          ) : (
            cartItems.map((item: CartItemFetchType) => (
              <CartItem key={item?.id} product={item} />
            ))
          )}
        </div>
        <div className="row-start-3">
          <hr className="border-neutral h-0.5 " />
          <div className="text-neutral flex flex-col mt-4">
            <span className="text-4xl font-medium">
              {totalPrice.toFixed(2)}$
            </span>
            <span>Total</span>
          </div>
        </div>

        <Link
          href={"/checkout"}
          className="  block border-2 border-neutral rounded-full w-fit px-4 py-2 text-neutral mx-auto hover:bg-neutral hover:text-primary transition-all duration-500 ease-in-out font-medium sm:text-2xl sm:px-6 sm:py-3 row-start-4"
          onClick={() => dispatch(toggleCart())}
        >
          Checkout
        </Link>
        <div className=" row-start-5">
          <IconsBtn
            style="bg-secondary hover:bg-neutral"
            clickEvent={() => dispatch(toggleCart())}
          >
            <CrossIcon style="fill-primary" />
          </IconsBtn>
        </div>
      </div>
    </div>
  );
};

export default CartList;
