// Imports for action types
import axios from "axios";
import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, FAIL_PRODUCT, GET_ONE_PRODUCT, GET_PRODUCTS, LOAD_PRODUCT } from "../actionTypes/prodActionTypes";

//! Action creators

// Add Product
export const addProd = (newProd) => async (dispatch) => {
    dispatch({ type: LOAD_PRODUCT });
    try {
        let config = {
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        };
        const result = await axios.post('/api/product/addProd', newProd, config);
        dispatch({ type: ADD_PRODUCT, payload: result.data.newProduct });
        console.log(result)
    } catch (error) {
        dispatch({ type: FAIL_PRODUCT, payload: error.response.data });
    }
};

// Get All Products
export const getAllProds = () => async (dispatch) => {
    dispatch({ type: LOAD_PRODUCT });
    try {
        const result = await axios.get('/api/product/allProds');
        dispatch({ type: GET_PRODUCTS, payload: result.data.prodsList });
    } catch (error) {
        dispatch({ type: FAIL_PRODUCT, payload: error.response.data });
    }
};

// Get One Product
export const getOneProd = (id) => async (dispatch) => {
    dispatch({ type: LOAD_PRODUCT });
    try {
        const result = await axios.get(`/api/product/${id}`);
        dispatch({ type: GET_ONE_PRODUCT, payload: result.data.oneProd });
    } catch (error) {
        dispatch({ type: FAIL_PRODUCT, payload: error.response.data });
    }
};

// Edit Product
export const updateProd = (id, editedProd) => async (dispatch) => {
    dispatch({ type: LOAD_PRODUCT });
    try {
        let config = {
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        };
        const result = await axios.put(`/api/product/${id}`, editedProd, config);
        dispatch({ type: EDIT_PRODUCT, payload: result.data.updatedProduct });
    } catch (error) {
        dispatch({ type: FAIL_PRODUCT, payload: error.response.data });
    }
};

// Delete Product
export const deleteProd = (id) => async (dispatch) => {
    dispatch({ type: LOAD_PRODUCT });
    try {
        let config = {
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        };
        const result = await axios.delete(`/api/product/${id}`, config);
        dispatch({ type: DELETE_PRODUCT, payload: result.data.deletedProd });
    } catch (error) {
        dispatch({ type: FAIL_PRODUCT, payload: error.response.data });
    }
};