// Imports
import axios from 'axios';
import { ADD_TO_CART, CLEAR_CART, FAIL_CART, LOAD_CART, REMOVE_ITEM, UPDATE_ITEM } from "../actionTypes/cartActionTypes";


//! Action Creators

// Add to cart
export const addToCart = (product, quantity) => async (dispatch, getState) => {
    dispatch({ type: LOAD_CART });
    try {
        const config = {
            headers : {
                Authorization: localStorage.getItem('token')
            }
        }
        const result = await axios.post('/api/cart/addTocart', { productId: product, quantity }, config)
        console.log(result);
        dispatch({ type: ADD_TO_CART, payload: { product, quantity }})
        localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems));
    } catch (error) {
        dispatch({ type: FAIL_CART, payload: error.message })
    }
};

// Update item
export const updateItem = (id, quantity) => async (dispatch, getState) => {
    dispatch({ type: LOAD_CART });
    try {
        const config = {
            headers : {
                Authorization: localStorage.getItem('token')
            }
        }
        const result = await axios.put(`/api/cart/${id}`, { quantity }, config);
        dispatch({ type: UPDATE_ITEM, payload: { id, quantity }})
        localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems));
    } catch (error) {
        dispatch({ type: FAIL_CART, payload: error.message })
    }
};

// Remove item
export const removeItem = (id) => async (dispatch, getState) => {
    dispatch({ type: LOAD_CART });
    try {
        const config = {
            headers : {
                Authorization: localStorage.getItem('token')
            }
        }
        const result = await axios.delete(`/api/cart/${id}`, config);
        dispatch({ type: REMOVE_ITEM, payload: id });
        localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems));
    } catch (error) {
        dispatch({ type: FAIL_CART, payload: error.message })
    }
};

// Clear cart
export const clearCart = () => async (dispatch) => {
    dispatch({ type: LOAD_CART });
    try {
        const config = {
            headers : {
                Authorization: localStorage.getItem('token')
            }
        }
        const result = await axios.put('/api/cart/clearCart', {}, config);
        dispatch({ type: CLEAR_CART });
        localStorage.removeItem('cartItems');
    } catch (error) {
        dispatch({ type: FAIL_CART, payload: error.message })
    }
};