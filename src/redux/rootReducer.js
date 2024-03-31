import { combineReducers } from '@reduxjs/toolkit';
import userLogin from './user/userLogin';

const rootReducer = combineReducers({
  userLogin,
  // ...other reducers
});
 export default rootReducer;