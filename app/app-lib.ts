import { logout } from "./app/features/user/userSlice";
import { clearCart } from "./app/features/cart/cartSlice";
import { store } from "./app/store";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import axios from "axios";
import { CartItemFetchType, CartItemType } from "./utils/Interfaces";

// Take number as argument and check if the number is single digit then add "0" to it.
export const singleDigitToDouble = (num: number) => {
  if (String(num).length === 1) {
    return "0" + String(num);
  } else {
    return String(num);
  }
};

// takes no argument and return void
export const logOut = () => {
  localStorage.removeItem("token");
  store.dispatch(logout());
  store.dispatch(clearCart());
  signOut(auth);
};

// Take date as argument to return date in string form
// yyyy-MM-dd hh:mm:ss => date month year
export const convertDateToString = (date: string | Date) => {
  const DateArray = String(date).split("T")[0].split("-");
  const day = DateArray[2],
    month = Number(DateArray[1]),
    year = DateArray[0],
    monthArray = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  return `${day} ${monthArray[month - 1]} ${year}`;
};

// Take blogId and send request to you api with token which is obtain from the localStorage to check if the user have like the blog or not.
export const checkLikeOfBlog = async (blogId: string) => {
  try {
    const url = process.env.NEXT_PUBLIC_BASE_URL + `/api/blogs/likes/${blogId}`;
    const token = localStorage.getItem("token");

    const response = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

//Take string as argument and return same string with capitalization
export const capitalizeWords = (words: string) => {
  const wordsArray = words.replaceAll("-", " ").split(" ");
  return wordsArray
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
};

//Takes cartList as argument and return full cartItems detail
export const fetchCartItemDetails = async (
  cart: CartItemType[]
): Promise<{ list: [] | CartItemFetchType[]; hasError: boolean }> => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/products/cart",
      cart
    );
    return { list: response.data, hasError: false };
  } catch (error) {
    return { list: [], hasError: true };
  }
};

export const calculateCartItemsPrice = (cartItems: CartItemFetchType[]) => {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    total = total + Number(cartItems[i].price) * cartItems[i].quantity;
  }
  return total;
};
