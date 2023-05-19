import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  userData: [],
  profileUrl:"",
  name:"",
  isAuthenticated:false,
  isRegistered:false,
  showAlert:false,
  loggedIn: false,
  loading: false,
  error: null,
  isUpdated:false
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
export const UserDetails = createAsyncThunk("user/details", async () => {
  const { data } = await axios.get(`/api/v1/me`);
  return data;
});
export const LogoutUser = createAsyncThunk("logout/user", async () => {
  const { data } = await axios.get(`/api/v1/logout`);
  return data;
});
export const userRegister = createAsyncThunk("register/user", async (myform) => {
  console.log(myform);
  // console.log(`this is userRegister${myform}`);
  const { data } = await axios.post(`/api/v1/register`, myform,{
    headers: {
      "Content-Type": "multipart/form-data"
    },
  });
  console.log(`this is userRegister`);
  console.log((myform));
  return data;
});
export const updateUser = createAsyncThunk("update/user", async (myForm) => {
   // console.log(`this is userRegister${myform}`);
  const { data } = await axios.put(`/api/v1/update/profile`, myForm,{
    headers: {
      "Content-Type": "application/json" 
    },
  });
  console.log(`this is userupdate`);
  
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
      state.name = action.payload.user.name;
      state.profileUrl=action.payload.user.avator.url;

    },
    [LoginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.loggedIn=false
    },
    [UserDetails.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [UserDetails.fulfilled]: (state, action) => {
      state.loggedIn=true
      state.loading = false;
      state.userData = action.payload.data;
      state.profileUrl=action.payload.data.avator.url;
      state.name=action.payload.data.name;

    },
    [UserDetails.rejected]: (state, action) => {
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
    [updateUser.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userData = action.payload.user;
      state.isUpdated=true
     
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
  
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
