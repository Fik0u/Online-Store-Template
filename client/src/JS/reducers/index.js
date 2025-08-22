import { combineReducers } from "redux";
import authReducer from "./authReducer";
import prodReducer from "./prodReducer";
import cartReducer from "./cartReducer";


const rootReducer = combineReducers({ authReducer, prodReducer, cartReducer });


export default rootReducer;