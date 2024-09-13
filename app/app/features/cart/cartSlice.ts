import { CartItemType } from "@/app/utils/Interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addToUserData = createAsyncThunk(
  "addItemToCart",
  async (data: CartItemType, thunkAPI) => {
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
    } catch (error) {}
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
      return response.data;
    } catch (error) {}
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
    } catch (error) {}
  }
);

export const cleanUserCartData = createAsyncThunk(
  "cleanUserCartData",
  async (thunkAPI) => {
    try {
      const response = await axios.delete(`/api/user/cart`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return response.data;
    } catch (error) {}
  }
);

const initialState: { cart: CartItemType[]; cartLoading: boolean } = {
  cartLoading: false,
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      state.cartLoading = true;
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
      state.cartLoading = false;
    },
    removeProduct(state, action) {
      state.cartLoading = true;

      let cartItem;
      if (action.payload.size) {
        cartItem = {
          id: action.payload.id,

          size: action.payload.size,
        };
      } else {
        cartItem = {
          id: action.payload.id,
        };
      }

      const itemIndex = state.cart.findIndex(
        (single) => single.id === cartItem.id && single.size === cartItem.size
      );

      if (itemIndex !== -1) {
        state.cart.splice(itemIndex, 1);
      }
      localStorage.removeItem("cart");
      localStorage.setItem("cart", JSON.stringify(state.cart));
      state.cartLoading = false;
    },
    clearCart(state) {
      state.cart = [];
      localStorage.removeItem("cart");
    },
    updateCart(state, action) {
      state.cart.push(...action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(addToUserData.pending, (state, action) => {
      state.cartLoading = true;
    });
    builder.addCase(addToUserData.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.cartLoading = false;
    });

    builder.addCase(removeFromUserData.pending, (state, action) => {
      state.cartLoading = true;
    });
    builder.addCase(removeFromUserData.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.cartLoading = false;
    });
    builder.addCase(retrieveUserCart.pending, (state, action) => {
      state.cartLoading = true;
    });
    builder.addCase(retrieveUserCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.cartLoading = false;
    });
    builder.addCase(cleanUserCartData.pending, (state, action) => {
      state.cartLoading = true;
    });
    builder.addCase(cleanUserCartData.fulfilled, (state, action) => {
      state.cart = [];
      state.cartLoading = false;
    });
  },
});

export const { addProduct, removeProduct, clearCart, updateCart } =
  cartSlice.actions;

export default cartSlice.reducer;
