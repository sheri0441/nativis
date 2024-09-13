import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  addQuantityAndSizeInCartItems,
  createOrder,
  createPayment,
  extractIdFromCartList,
  fetchCartItemFromPrismaById,
  getUserFromFirebase,
  getUserOrderList,
  getUserPrismaId,
  sendEmail,
} from "../api-lib";
import { shippingInfoSchema } from "@/app/utils/schema";

import { calculateCartItemsPrice } from "@/app/app-lib";
import { order } from "@/app/utils/emails/Order";

export const POST = async (request: NextRequest) => {
  const token = headers().get("authorization");

  if (token === null) {
    return NextResponse.json(
      { message: "Access failed due to token" },
      { status: 401 }
    );
  }

  const body = await request.json();
  let validOrder;
  try {
    validOrder = shippingInfoSchema.parse(body);
  } catch (error) {
    return NextResponse.json(
      { message: "Please provide the complete required data." },
      { status: 500 }
    );
  }

  const { list, delivery } = validOrder;

  const cartListIdArray = extractIdFromCartList(list);

  const { cart, prismaCartError } = await fetchCartItemFromPrismaById(
    cartListIdArray
  );

  if (prismaCartError || cart === null) {
    return NextResponse.json(
      { message: "There is some error in backend. Please try later." },
      { status: 500 }
    );
  }

  const fullCartItemList = addQuantityAndSizeInCartItems({
    prismaCartList: cart,
    cartList: list,
  });

  const totalProductPrice = calculateCartItemsPrice(fullCartItemList);

  let totalPrice = 0;
  if (delivery === "standard") {
    totalPrice = totalProductPrice;
  } else {
    totalPrice = totalProductPrice + 20;
  }

  const { paymentError, paymentId } = await createPayment({
    token,
    totalPrice,
  });

  if (paymentError || !paymentId) {
    return NextResponse.json(
      {
        message:
          "There were some issue during the payment process. Please try again.",
      },
      { status: 500 }
    );
  }

  const { orderError, orderId } = await createOrder({
    orderDetail: validOrder,
    totalPrice,
    paymentId,
  });

  if (orderError || !orderId) {
    console.log({
      message: "There were some issue during the order save time.",
      paymentId,
      orderDetail: validOrder,
    });
  }

  const OrderEmailTemplate = order({
    totalProductPrice,
    orderDetail: validOrder,
    orderId,
    fullDetailCartList: fullCartItemList,
    totalPrice,
  });

  const isEmailSend = await sendEmail({
    subject: "Order Confirmation",
    to: validOrder.email,
    body: OrderEmailTemplate,
  });

  if (!isEmailSend) {
    console.log(`Email not sent to ${validOrder.email} about order ${orderId}`);
  }

  return NextResponse.json({ message: "Received your order" }, { status: 201 });
};

export const GET = async (request: NextRequest) => {
  const token = headers().get("authorization");

  const { error, validUser } = await getUserFromFirebase(token);

  const { email, userPrismaError } = await getUserPrismaId(validUser.uid);

  if (error.hasError || userPrismaError) {
    return NextResponse.json({ message: "Access failed." }, { status: 401 });
  }

  const { orderList, orderListError } = await getUserOrderList(email);

  if (orderListError) {
    return NextResponse.json(
      { message: "There were some issue in the server." },
      { status: 500 }
    );
  }

  return NextResponse.json(orderList);
};
