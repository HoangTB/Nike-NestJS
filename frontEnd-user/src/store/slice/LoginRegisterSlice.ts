import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ILogin, ILoginUser, UserAPI } from "../../models/LoginRegister";

export const login = createAsyncThunk(
  "auth/login",
  async (userData: ILoginUser) => {
    try {
      const response = await UserAPI.login(userData);

      if (response.data.user.status === 1) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("accessToken", response.data.accessToken);
      } else {
        return { message: "Account has been locked" };
      }

      return response;
    } catch (error) {
      return error;
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

const userSlice = createSlice({
  name: "user",
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

export default userSlice.reducer;
