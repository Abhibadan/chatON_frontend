import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const friends = createSlice({
  name: "friends",
  initialState: {
    frinesdRequest: false,
    friendError: false,
    friendlist: [],
    friendlistError: null,
  },
//   reducers: {
//     updateUser(state, action) {
//       state.user = { ...state.user, ...action.payload };
//     },
//     logout(state) {
//       localStorage.removeItem('Auth');
//       localStorage.removeItem('token');
//       state.frinesdRequest = false;
//       state.friendError = false;
//       state.user = null;
//       state.friendlistError = null;
//       state.profileRequest = false;
//       state.profileError = false;
//       state.profile = null;
//     }
//   },
  extraReducers: (builder) => {
    builder.addCase(friend.pending, (state) => {
      state.frinesdRequest = true;
      state.friendError = false;
      state.friendlist = [];
      state.friendlistError = null;
    }).addCase(friend.rejected,  (state,action) => {
      state.frinesdRequest = false;
      state.friendError = true;
      state.friendlist = [];
      state.friendlistError = action.error;
      toast.error(action.error.message);
    }).addCase(friend.fulfilled,(state, action) => {
      state.frinesdRequest = false;
      state.friendError = false;
      state.friendlist = action.payload.user;
      state.friendlistError = null;
      toast.success(action.payload.message);
    });
  },
});
export const friend =createAsyncThunk('friend',async()=>{
  try{
    const response = await axios
    .get(`${process.env.REACT_APP_BACKEND}/auth/get-connection-details`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
  }catch(err){
    throw err.response.data;
  }
  
});
export default friends.reducer;
