import { createSlice } from "@reduxjs/toolkit";

const authManagementSlice = createSlice({
  name: "authToken",
  initialState: {
    // email: null,
    token: null,
    validation: null,
  },
  reducers: {
    validateToken(state, action) {
      state.validation = action.payload.validation;
    },
    cleanUpToken(state) {
      state.validation = null;
    },
  },
});

export const AuthActions = authManagementSlice.actions;

export default authManagementSlice;
