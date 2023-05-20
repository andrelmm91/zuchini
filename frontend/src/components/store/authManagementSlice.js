import { createSlice } from "@reduxjs/toolkit";

const authManagementSlice = createSlice({
  name: "authToken",
  initialState: {
    validation: null,
    email: null,
  },
  reducers: {
    loggedInEmail(state, action) {
      state.email = action.payload.email;
    },
    validateToken(state, action) {
      state.validation = action.payload.validation;
    },
    cleanUpToken(state) {
      state.validation = null;
      state.email = null;
    },
  },
});

export const AuthActions = authManagementSlice.actions;

export default authManagementSlice;
