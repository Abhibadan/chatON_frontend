import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const userLogin = createSlice({
  name: "userLogin",
  initialState: {
    loginRequest: false,
    loginError: false,
    user: null,
    userError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loginRequest = true;
      state.loginError = false;
      state.user = null;
      state.userError = null;
    }).addCase(login.rejected,  (state,action) => {
      state.loginRequest = false;
      state.loginError = true;
      state.user = null;
      state.userError = action.error;
      toast.error(action.error.message);
    }).addCase(login.fulfilled,(state, action) => {
      localStorage.setItem('Auth',JSON.stringify(action.payload.user));
      localStorage.setItem('token',action.payload.auth);
      state.loginRequest = false;
      state.loginError = false;
      state.user = action.payload.user;
      state.userError = null;
      toast.success(action.payload.message);
    });
  },
});
export const login =createAsyncThunk('login',async({email, password})=>{
  try{
    const response = await axios
    .post(`${process.env.REACT_APP_BACKEND}/login`, {
      email: email,
      password: password,
    });
    return response.data;
  }catch(err){
    throw err.response.data;
  }
  
});
export default userLogin.reducer;
