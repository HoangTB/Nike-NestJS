import { createSlice } from "@reduxjs/toolkit";

const HistorySlice = createSlice({
  name: "HistorySlice",
  initialState: null,
  reducers: {
    setHistory: (state, action) => {
      console.log(22, state);
      return (state = action.payload);
    },
  },
});

export const { setHistory } = HistorySlice.actions;
export default HistorySlice.reducer;
