import { createSlice } from "@reduxjs/toolkit";

const productMergerSlice = createSlice({
  name: "productMergerSlice",
  initialState: false,

  reducers: {
    updateState: (state) => {
      return !state;
    },
  },
});

const { actions, reducer } = productMergerSlice;
export const { updateState } = actions;
export default reducer;
