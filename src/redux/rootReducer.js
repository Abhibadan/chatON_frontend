import { combineReducers } from '@reduxjs/toolkit';
import userLogin from './user/userLogin';
import messaging from './user/messaging';
import friends from './user/friends';
import userlist from './user/alluser';
const rootReducer = combineReducers({
  userLogin,
  messaging,
  friends,
  userlist,
  // ...other reducers
});
 export default rootReducer;