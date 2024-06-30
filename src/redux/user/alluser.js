import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const users = createSlice({
  name: "users",
  initialState: {
    userRequest: false,
    userError: false,
    userlist: [],
    userlistError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(userlist.pending, (state) => {
      state.userRequest = true;
      state.userError = false;
      state.userlist = [];
      state.userlistError = null;
    }).addCase(userlist.rejected,  (state,action) => {
      state.userRequest = false;
      state.userError = true;
      state.userlist = [];
      state.userlistError = action.error;
      toast.error(action.error.message);
    }).addCase(userlist.fulfilled,(state, action) => {
      state.userRequest = false;
      state.userError = false;
      state.userlist = action.payload.user;
      state.userlistError = null;
      toast.success(action.payload.message);
    });
  },
});
export const userlist =createAsyncThunk('userlist',async()=>{
  try{
    const response = await axios
    .get(`${process.env.REACT_APP_BACKEND}/auth/allusers`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
  }catch(err){
    throw err.response.data;
  }
  
});
export default users.reducer;
