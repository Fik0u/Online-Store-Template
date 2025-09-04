// Imports 
import { ADD_ORDER, FAIL_ORDER, GET_ALL_ORDERS, GET_MY_ORDERS, GET_ONE_ORDER, LOAD_ORDER, UPDATE_STATUS_ORDER } from "../actionTypes/orderActionTypes";


// Initrial State
const initialState = {
    isLoad: false,
    orders: [],
    myOrders: [],
    order : {},
    errors: null
};


// Reducer Pure Function
const orderReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOAD_ORDER: return { ...state, isLoad: true };

        case ADD_ORDER: return { ...state, isLoad: false, orders: [...state.orders, payload] };

        case GET_ALL_ORDERS: return { ...state, isLoad: false, orders: payload };

        case GET_MY_ORDERS: return { ...state, isLoad: false, myOrders: payload };

        case GET_ONE_ORDER: return { ...state, isLoad: false, order: payload };

        case UPDATE_STATUS_ORDER: return { ...state, isLoad: false, orders: state.orders.map((order) => order._id === payload._id ? payload : order) };

        case FAIL_ORDER: return { ...state, isLoad: false, errors: payload };
    
        default: return state;
    }
};



export default orderReducer;