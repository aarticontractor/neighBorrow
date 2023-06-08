import React, { useEffect, useState, useContext } from 'react';

import { loadStripe } from '@stripe/stripe-js';
import CartItem from '../CartItem';
import { useLazyQuery, useQuery } from '@apollo/client';
import { idbPromise } from '../../utils/helpers';
import './cart.css';
import Auth from '../../utils/auth';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/action';
import { useStoreContext } from '../../utils/globalState.js';
import { QUERY_PRODUCTS, QUERY_CHECKOUT } from '../../utils/queries.js';
import {
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    ADD_TO_CART,
    UPDATE_PRODUCTS,
} from '../../utils/action';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
    const [currentProduct, setCurrentProduct] = useState({});
    const [state, dispatch] = useContext(useStoreContext());

    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
    const { loading } = useQuery(QUERY_PRODUCTS);

    const { products, cart } = state;
    useEffect(() => {
        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data]);

    useEffect(() => {
        if (products.length) {
            setCurrentProduct(products.find((product) => product._id === currentProduct._id));
        } else if (data) {
            dispatch({
                type: UPDATE_PRODUCTS,
                products: data.products,
            });

            data.products.forEach((product) => {
                idbPromise('products', 'put', product);
            });
        } else if (!loading) {
            idbPromise('products', 'get').then((indexedProducts) => {
                dispatch({
                    type: UPDATE_PRODUCTS,
                    products: indexedProducts,
                });
            });
        }
    }, [products, data, loading, dispatch, currentProduct._id]);

    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === currentProduct._id);
        if (itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: currentProduct._id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
            });
            idbPromise('cart', 'put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
            });
        } else {
            dispatch({
                type: ADD_TO_CART,
                product: { ...currentProduct, purchaseQuantity: 1 },
            });
            idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
        }
    };

    const removeFromCart = () => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: currentProduct._id,
        });

        idbPromise('cart', 'delete', { ...currentProduct });
    };

    // useEffect(() => {
    //     if (checkoutData) {
    //         stripePromise.then((res) => {
    //             res.redirectToCheckout({ sessionId: checkoutData.checkout.session });
    //         });
    //     }
    // }, [checkoutData]);

    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise('cart', 'get');
            dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
        }

        if (!state.cart.length) {
            getCart();
        }
    }, [state.cart.length, dispatch]);

    function toggleCart() {
        dispatch({ type: TOGGLE_CART });
    }
    function submitCheckout() {
        const productIds = [];

        state.cart.forEach((item) => {
            for (let i = 0; i < item.purchaseQuantity; i++) {
                productIds.push(item._id);
            }

        });
        getCheckout({
            variables: { products: productIds },
        });
    }


    function calculateTotal() {
        let sum = 0;
        state.cart.forEach((item) => {
            sum += item.price;
        });
        return sum;
    }


    return (
        <div className="cart">
            <div className="close" onClick={toggleCart}>
                [close]
            </div>
            <h2>Shopping Cart</h2>
            {state.cart.length ? (
                <div>
                    <ul>
                        {state.cart.map((item) => (
                            <CartItem key={item._id} item={item} />
                        ))}
                    </ul>
                    <button onClick={addToCart}>Add to Cart</button>
                    <button
                        disabled={!cart.find((p) => p._id === currentProduct._id)}
                        onClick={removeFromCart}
                    >
                        Remove from Cart
                    </button>
                    <div className="total-price">
                        <strong>Total: ${calculateTotal()}</strong>

                        {Auth.loggedIn() ? (
                            <button onClick={submitCheckout}>Checkout</button>
                        ) : (
                            <span>(log in to check out)</span>
                        )}
                    </div>
                </div>
            ) : (
                <h3>
                    <span role="img" aria-label="shocked">
                        😱
                    </span>
                    You haven't added anything to your cart yet!
                </h3>
            )}
        </div>
    );
}
export default Cart;