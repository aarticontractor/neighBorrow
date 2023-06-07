import { useReducer } from 'react';
import {
    UPDATE_PRODUCTS,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    UPDATE_CART_QUANTITY,
    TOGGLE_CART,
} from './action';

const initialState = {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
};
export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_PRODUCTS:
            return {
                ...state,
                products: [...action.products],
            };
        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cart: [...state.cart, ...action.products],
            };
        case REMOVE_FROM_CART:
            let newState = state.cart.filter((product) => {
                return product.id !== action._id;
            });
            return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState,
            };
        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map((product) => {
                    if (action._id === product._id) {
                        product.purchaseQuantity = action.purchaseQuantity;
                    }
                    return product;
                }),
            };
        case CLEAR_CART:
            return {
                ...state,
                cartOpen: false,
                cart: [],
            };
        case ADD_TO_CART:
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.product],
            };
        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen,
            };
        default:
            return state;
    }
};
export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
}