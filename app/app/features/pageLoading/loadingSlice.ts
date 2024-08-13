import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoadingPage(state, action) {
      state.isLoading = action.payload;
    },
  },
});
export const { setLoadingPage } = loadingSlice.actions;
export default loadingSlice.reducer;
