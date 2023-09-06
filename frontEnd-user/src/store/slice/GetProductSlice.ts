import { createSlice } from "@reduxjs/toolkit";

const SideBarSlice = createSlice({
  name: "sideBarSlice",
  initialState: "",
  reducers: {
    setSideBar: (state, action) => {
      console.log(state);

      return (state = action.payload);
    },
  },
});

export const { setSideBar } = SideBarSlice.actions;
export default SideBarSlice.reducer;
