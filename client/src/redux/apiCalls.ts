import axios from "axios";
import { loginStart, loginFailure, loginSuccess, logout } from "./userRedux";

export const userLogin = async (dispatch: any, user: any) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8080/api/auth/login", user);

    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const userLogout = (dispatch: any) => {
  dispatch(logout());
};
