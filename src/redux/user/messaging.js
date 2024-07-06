import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { clear } from "@testing-library/user-event/dist/clear";
// import axios from "axios";
import { toast } from "react-toastify";
const messaging = createSlice({
  name: "messaging",
  initialState: {
    messageExist: false,
    message:[]
  },
  reducers: {
    addNewMessage: (state, action) => {
      state.messageExist = true;
      state.message.push(action.payload);
    },
    addOldMessage:(state,action)=>{
        state.messageExist = true;
        state.message.unshift(action.payload);
    },
    clearMessage:(state)=>{
      state.messageExist = false;
      state.message = [];
    }
  }
});
export const { addNewMessage, addOldMessage, clearMessage } = messaging.actions;

export default messaging.reducer;
