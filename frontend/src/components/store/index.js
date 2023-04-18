import { configureStore } from "@reduxjs/toolkit";
import UserManagementSlice from "./UserManagementSlice";

const store = configureStore({
  reducer: { userManagementHandler: UserManagementSlice.reducer },
});

export default store;
