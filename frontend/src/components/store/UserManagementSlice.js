import { createSlice } from "@reduxjs/toolkit";

const UserManagementSlice = createSlice({
  name: "userManagementHandler",
  initialState: {
    profilePhoto: null,
    ProfileName: null,
    initialLocation: [{ lat: "52.5", lng: "13.405" }],
    notificationList: [],
    eventListLiked: [],
    eventListConfirmed: [],
  },
  reducers: {
    updateProfile(state, action) {
      state.profilePhoto = action.payload.ProfilePhoto;
      state.initialLocation = action.payload.initialLocation;
      state.ProfileName = action.payload.ProfileName;
    },
    updateNotification(state, action) {
      state.notificationList.push(action.payload.notificationList);
    },
    updateEventListLiked(state, action) {
      state.eventListLiked.push(action.payload.eventListLiked);
    },
    updateEventListConfirmed(state, action) {
      state.eventListConfirmed.push(action.payload.eventListConfirmed);
    },
  },
});

export const userActions = UserManagementSlice.actions;

export default UserManagementSlice;
