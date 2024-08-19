import { CartItemType } from "@/app/utils/Interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addToUserData = createAsyncThunk(
  "addItemToCart",
  async (data: CartItemType[], thunkAPI) => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/user/cart",
        data,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      localStorage.removeItem("cart");

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const retrieveUserCart = createAsyncThunk(
  "retrieveUserCart",
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/user/cart",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      localStorage.removeItem("cart");
      console.log();

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeFromUserData = createAsyncThunk(
  "removeItemFromCart",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.delete(`/api/user/cart/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState: { cart: CartItemType[] } = {
  cart: [],
};

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

      const itemIndex = state.cart.findIndex(
        (single) => single.id === cartItem.id && single.size === cartItem.size
      );
      if (itemIndex === -1) {
        state.cart.push(cartItem);
      } else {
        state.cart[itemIndex].quantity += cartItem.quantity;
      }

      localStorage.removeItem("cart");
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeProduct(state, action) {
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
      localStorage.removeItem("cart");
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart(state) {
      state.cart = [];
      localStorage.removeItem("cart");
    },
  },
  extraReducers(builder) {
    builder.addCase(addToUserData.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(removeFromUserData.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(retrieveUserCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
  },
});

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
