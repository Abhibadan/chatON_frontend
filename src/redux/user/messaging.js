import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import { toast } from "react-toastify";
const messaging = createSlice({
  name: "messaging",
  initialState: {
    message:[]
  },
  reducers: {
    addNewMessage: (state, action) => {
      state.message.push(action.payload);
    },
    addOldMessage:(state,action)=>{
        state.message.unshift(action.payload);
    }
  }
});

export const { addNewMessage, addOldMessage } = messaging.actions;

export default messaging.reducer;
