import { CartItemType } from "@/app/utils/Interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addToUserData = createAsyncThunk(
  "addItemToCart",
  async (data: CartItemType[], thunkAPI) => {
    try {
      const response = await axios.post("./api/user/cart", data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (response.status !== 201) {
        addToUserData(data);
      }

      return response.data.cart;
    } catch (error) {
      console.log(error);
    }
  }
);
const removeFromUserData = createAsyncThunk(
  "removeItemFromCart",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.delete(`/api/user/cart/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      return response.data.cart;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState: CartItemType[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      let cartItem;
      if (action.payload.size) {
        cartItem = {
          id: action.payload.id,
          quantity: action.payload.quantity,
          size: action.payload.size,
        };
      } else {
        cartItem = {
          id: action.payload.id,
          quantity: action.payload.quantity,
        };
      }
      if (action.payload.isLogin) {
        addToUserData([cartItem]);
      } else {
        const item = state.find((item) => item.id === cartItem.id);
        const itemIndex = state.findIndex((item) => item.id === cartItem.id);
        if (item && item.size === cartItem.size) {
          state[itemIndex].quantity += cartItem.quantity;
        } else {
          state.push(cartItem);
        }
        localStorage.removeItem("cart");
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    removeProduct(state, action) {
      if (action.payload.isLogin) {
        removeFromUserData(action.payload.id);
      } else {
        const index = state.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.splice(index, 1);
        }
        localStorage.removeItem("cart");
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    clearCart(state) {
      state = [];
      localStorage.removeItem("cart");
    },
  },
  extraReducers(builder) {
    builder.addCase(addToUserData.fulfilled, (state, action) => {
      state = action.payload;
      localStorage.removeItem("cart");
    });
    builder.addCase(removeFromUserData.fulfilled, (state, action) => {
      state = action.payload;
    });
  },
});

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
