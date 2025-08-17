// Imports 
import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, FAIL_PRODUCT, GET_ONE_PRODUCT, GET_PRODUCTS, LOAD_PRODUCT } from "../actionTypes/prodActionTypes";

// Initial state
const initialState = {
    isLoad : false,
    prodsList: [],
    product: {},
    success: false,
    errors: []
};

// Reducer Pure Function
const prodReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOAD_PRODUCT: return { ...state, isLoad: true };

        case ADD_PRODUCT: return { ...state, isLoad: false, products: [...state.prodsList, payload], success: true};

        case GET_PRODUCTS: return { ...state, isLoad: false, prodsList: payload };

        case GET_ONE_PRODUCT: return { ...state, isLoad: false, product: payload };

        case EDIT_PRODUCT: return { ...state, isLoad: false, products: state.prodsList.map((product) => product._id === payload._id ? { ...product, ...payload } : product), success: true };

        case DELETE_PRODUCT: return { ...state, loading: false, products: state.prodsList.filter((product) => product._id !== payload._id), success: true };

        case FAIL_PRODUCT: return { ...state, isLoad: false, errors: payload };

        default: return state
    }
};


export default prodReducer;