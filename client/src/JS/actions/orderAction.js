//Imports 
import axios from "axios";
import { ADD_ORDER, FAIL_ORDER, GET_ALL_ORDERS, GET_MY_ORDERS, GET_ONE_ORDER, LOAD_ORDER, UPDATE_STATUS_ORDER } from "../actionTypes/orderActionTypes";
import { clearCart } from "./cartAction";


//! Action Creators

// New Order
export const addOrder = (newOrder, navigate) => async (dispatch) => {
    dispatch({ type: LOAD_ORDER });
    try {
        const config = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        };
        const result = await axios.post('/api/order/addOrder', newOrder, config);
        dispatch({ type: ADD_ORDER, payload: result.data });
        dispatch(clearCart());
        navigate('/');
    } catch (error) {
        dispatch({ type: FAIL_ORDER, payload: error.response.data.errors });
    }
};

// Get Orders
export const getAllOrders = () => async (dispatch) => {
    dispatch({ type: LOAD_ORDER });
    try {
        const config = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        };
        const result = await axios.get('/api/order/all', config);
        dispatch({ type: GET_ALL_ORDERS, payload: result.data.orders });
    } catch (error) {
        dispatch({ type: FAIL_ORDER, payload: error.response.data.errors });
    }
};

// Get User Orders
export const getMyOrders = () => async (dispatch) => {
    dispatch({ type: LOAD_ORDER });
    try {
        const config = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        };
        const result = await axios.get('/api/order/myOrders', config);
        dispatch({ type: GET_MY_ORDERS, payload: result.data.orders });
    } catch (error) {
        dispatch({ type: FAIL_ORDER, payload: error.response.data.errors });
    }
}

// Get One Order
export const getOneOrder = (id) => async (dispatch) => {
    dispatch({ type: LOAD_ORDER });
    try {
        const config = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        };
        const result = await axios.get(`/api/order/${id}`, config);
        dispatch({ type: GET_ONE_ORDER, payload: result.data.order });
    } catch (error) {
        dispatch({ type: FAIL_ORDER, payload: error.response.data.errors });
    }
};

// Update Order Status
export const updateStatus = (id, status) => async (dispatch) => {
    dispatch({ type: LOAD_ORDER });
    try {
        const config = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        };
        const result = await axios.put(`/api/order/${id}`, { status }, config);
        dispatch({ type: UPDATE_STATUS_ORDER, payload: result.data.order });
    } catch (error) {
        dispatch({ type: FAIL_ORDER, payload: error.response.data.errors });
    }
};