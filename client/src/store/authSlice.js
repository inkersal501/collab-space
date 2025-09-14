import { createSlice } from "@reduxjs/toolkit";
import { defaultState } from "@utils/config";
  
const authSlice = createSlice({
  name : "auth",
  initialState : defaultState.auth,
  reducers : {
    login : (state, action) => {
      state.user = {...state.user, ...action.payload}; 
      state.isAuthenticated = true;
    },
    logout : (state) => {
      state.user = defaultState.auth.user; 
      state.isAuthenticated = false;
    }, 
  },
});
  
export const { login, logout } = authSlice.actions;
export default authSlice.reducer; 
