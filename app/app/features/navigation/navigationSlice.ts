import { createSlice } from "@reduxjs/toolkit";

interface NavigationInterface {
  showMenu: boolean;
  showCart: boolean;
}

const initialState: NavigationInterface = {
  showMenu: false,
  showCart: false,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.showMenu = !state.showMenu;
    },
    toggleCart: (state) => {
      state.showCart = !state.showCart;
    },
  },
});

export const { toggleCart, toggleMenu } = navigationSlice.actions;

export default navigationSlice.reducer;
