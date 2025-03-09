import { createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../../interfaces/user_interface";

const initialState = {
  userAuthenticated: {} as UserInterface,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAuthenticated: (state, action) => {
      state.userAuthenticated = action.payload;
    },
  },
});

export const { setUserAuthenticated } = userSlice.actions;

export const userReducer = userSlice.reducer;
