import { combineReducers } from "redux";
import LoginRegister from "../slice/LoginRegisterSlice";
import UpdateProSlice from "../slice/UpdateProSlice";

const rootReducer = combineReducers({
  user: LoginRegister,
  update: UpdateProSlice,
});

export default rootReducer;
