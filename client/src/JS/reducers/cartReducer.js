// Imports

import { ADD_TO_CART, CLEAR_CART, FAIL_CART, LOAD_CART, REMOVE_ITEM, UPDATE_ITEM } from "../actionTypes/cartActionTypes";



const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];


// Initial state
const initialState = {
    isLoad: false,
    cartItems: cartItemsFromStorage,
    totalAmount: cartItemsFromStorage.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
};



// Reducer pure function
const cartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOAD_CART: return { ...state, isLoad: true };

        case ADD_TO_CART: {
            const found = state.cartItems.find(item => item.product._id === payload.product._id);
            let updatedItem;
            if (found) {
                updatedItem = state.cartItems.map(item => item.product._id === payload.product._id
                    ? { ...item, quantity: item.quantity + payload.quantity } : item);
            } else {
                updatedItem = [...state.cartItems, payload]
            }
            const totalAmount = updatedItem.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

            return { ...state, isLoad: false, cartItems: updatedItem, totalAmount };
        };

        case UPDATE_ITEM: {
            const updatedItem = state.cartItems.map(item => item.product._id === payload.id
                ? { ...item, quantity: payload.quantity } : item);
            
                const totalAmount = updatedItem.reduce((acc, item) => acc + item.product.price * item.quantity, 0);    
            return { ...state, isLoad: false, cartItems: updatedItem, totalAmount };
        };

        case REMOVE_ITEM: {
            const removedItem = state.cartItems.filter(item => item.product._id !== payload);

            const totalAmount = removedItem.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
            
            return { ...state, isLoad: false, cartItems: removedItem, totalAmount };
        };

        case CLEAR_CART: return { ...state, isLoad: false, cartItems: [], totalAmount: 0 };

        case FAIL_CART: return { ...state, isLoad: false };
    
        default: return state;
    }
};


export default cartReducer;