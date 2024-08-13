import { createSlice } from "@reduxjs/toolkit";

interface user {
  id: string;
  name: string;
  email: string;
  isLogin: boolean;
  image: string;
  provider: string;
}

const initialState = {
  isLogin: false,
  id: null,
  name: null,
  email: null,
  image: null,
  provider: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.provider = action.payload.provider;
    },
    logout: (state) => {
      state.isLogin = false;
      state.id = null;
      state.name = null;
      state.email = null;
      state.provider = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
