import { redirect } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { tokenVerify } from "../store/auth-actions";

//////////////// loader for RootPage.js
export const tokenLoader = () => {
  return getAuthToken();
};

// get the token and diliver it to the rootpage.js if exists or no more than 1h
export const getAuthToken = () => {
  const token = localStorage.getItem("token");

  return token;
};

// get token duration and return the duration

// //////////////
