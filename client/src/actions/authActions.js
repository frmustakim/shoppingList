import axios from "axios";
import { returnErrors } from "./errorActions";

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";

//Check token & load user
export const loadUser = () => (dispatch, getState) => {
  //User Loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenconfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

//Setup config/header & token
export const tokenconfig = getState => {
  //Get token from localstorage
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Constent-type": "Application/json"
    }
  };

  //If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
