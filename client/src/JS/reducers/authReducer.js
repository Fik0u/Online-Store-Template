// Imports
import { CURRENT_AUTH, FAIL_AUTH, LOAD_AUTH, LOGOUT_AUTH, SUCCESS_AUTH } from "../actionTypes/authActionTypes";


// Initial state for the authentication reducer
const initialState = {
    isLoad: false,
    isAuth: false,
    user: {},
    success: [],
    errors: []
}

// Reducer Pure Function
const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOAD_AUTH: return { ...state, isLoad: true };

        case SUCCESS_AUTH: 
        localStorage.setItem("token", payload.token);
        return { ...state, isLoad: false, isAuth: true, user: payload.user, success: payload.success, errors: [] };

        case FAIL_AUTH: return { ...state, isLoad: false, errors: payload, success: [] };

        case CURRENT_AUTH: return { ...state, isLoad: false, isAuth: true, user: payload };

        case LOGOUT_AUTH: 
        localStorage.removeItem("token");
        return { ...state, isLoad: false, isAuth: false, user: {}, success: [], errors: [] };
    
        default: return state;
    }
};

export default authReducer;