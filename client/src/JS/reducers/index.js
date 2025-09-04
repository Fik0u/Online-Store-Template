import { combineReducers } from "redux";
import authReducer from "./authReducer";
import prodReducer from "./prodReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";


const rootReducer = combineReducers({ authReducer, prodReducer, cartReducer, orderReducer });


export default rootReducer;