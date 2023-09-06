import { combineReducers } from "redux";
import LoginSlice from "../slice/LoginSlice";
import UpdateProSlice from "../slice/UpdateProSlice";
const rootReducer = combineReducers({
  login: LoginSlice,
  update: UpdateProSlice,
});

export default rootReducer;
