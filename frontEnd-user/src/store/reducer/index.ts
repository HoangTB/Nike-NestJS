import { combineReducers } from "redux";
import LoginRegister from "../slice/LoginRegisterSlice";
import UpdateProSlice from "../slice/UpdateProSlice";
import SideBarSlice from "../slice/GetProductSlice";
import CreateHistory from "../slice/CreateHistory";
const rootReducer = combineReducers({
  user: LoginRegister,
  update: UpdateProSlice,
  sidebar: SideBarSlice,
  history: CreateHistory,
});

export default rootReducer;
