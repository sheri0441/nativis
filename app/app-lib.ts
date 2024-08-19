import { logout } from "./app/features/user/userSlice";
import { clearCart } from "./app/features/cart/cartSlice";
import { store } from "./app/store";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

export const singleDigitToDouble = (num: number) => {
  if (String(num).length === 1) {
    return "0" + String(num);
  } else {
    return String(num);
  }
};

export const logOut = () => {
  localStorage.removeItem("token");
  store.dispatch(logout());
  store.dispatch(clearCart());
  signOut(auth);
};
