import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userData: [],
  isAuthenticated:false,
  isRegistered:false,
  showAlert:false,
  loggedIn: false,
  loading: false,
  error: null,
};
export const LoginUser = createAsyncThunk("login/user", async ({Email,password}) => {
  const { data } = await axios.post(`/api/v1/login`, {Email,password},{
    headers: {
      "Content-Type": "application/json",
      withCredentials: true
    },
  });
  return data;
});
export const LogoutUser = createAsyncThunk("logout/user", async () => {
  const { data } = await axios.get(`/api/v1/logout`);
  return data;
});
export const userRegister = createAsyncThunk("register/user", async ({Email,phone,name,password}) => {
  const { data } = await axios.post(`/api/v1/register`, {Email,phone,name,password},{
    headers: {
      "Content-Type": "application/json",
      withCredentials: true
    },
  });
  return data;
});

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      console.log(state.userData);
    },
    resetShowAlert:(state,action)=>{
      state.showAlert=action.payload
    }
  },
  extraReducers: {
    [LoginUser.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [LoginUser.fulfilled]: (state, action) => {
      state.loggedIn=true
      state.loading = false;
      state.userData = action.payload.user;

    },
    [LoginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.loggedIn=false
    },
    [userRegister.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [userRegister.fulfilled]: (state, action) => {
      state.loading = false;
      state.userData = action.payload.user;
      state.isRegistered=true
    },
    [userRegister.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.isRegistered= false;
      state.showAlert=true

    },
    [LogoutUser.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [LogoutUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userData = null;
      state.loggedIn=false;
    },
    [LogoutUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.isRegistered= false;
      state.showAlert=true

    }
  },
});

export const { setUserData,resetShowAlert } = userSlice.actions;
export default userSlice.reducer;
