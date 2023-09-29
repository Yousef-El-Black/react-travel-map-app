import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    isError: false,
  },
  reducers: {
    loginStart: (state: any) => {
      state.isFetching = true;
      state.isError = false;
    },
    loginSuccess: (state: any, action: any) => {
      state.currentUser = action.payload;
      state.isFetching = false;
      state.isError = false;
    },
    loginFailure: (state: any) => {
      state.currentUser = null;
      state.isFetching = false;
      state.isError = true;
    },
    logout: (state: any) => {
      state.currentUser = null;
      state.isFetching = false;
      state.isError = false;
    },
  },
});

export const { loginFailure, loginStart, loginSuccess, logout } =
  userSlice.actions;
export default userSlice.reducer;
