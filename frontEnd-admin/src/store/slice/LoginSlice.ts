import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ILogin, ILoginAdmin, Login } from "../../models/Login";

export const login = createAsyncThunk(
  "admin/login",
  async (adminData: ILoginAdmin) => {
    try {
      const response: ILogin = await Login.LoginAdmin(adminData);

      localStorage.setItem("admin", JSON.stringify(response.data.user));
      localStorage.setItem("accessToken", response.data.accessToken);
      return response;
    } catch (err) {
      throw err;
    }
  }
);

interface AdminState {
  data: {};
  token: string;
  isLoggedIn: boolean;
  error: boolean;
}

const initialState: AdminState = {
  data: {},
  token: "",
  isLoggedIn: false,
  error: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: {
    [login.fulfilled as any]: (state, action: PayloadAction<ILogin>) => {
      state.data = action.payload?.data?.user;
      state.token = action.payload?.data?.accessToken;
      state.isLoggedIn = true;
    },
  },
});

export default adminSlice.reducer;
