import { configureStore } from "@reduxjs/toolkit";
import UserManagementSlice from "./UserManagementSlice";
import authManagementSlice from "./authManagementSlice";

const store = configureStore({
  reducer: {
    userManagementHandler: UserManagementSlice.reducer,
    authToken: authManagementSlice.reducer,
  },
});

export default store;
