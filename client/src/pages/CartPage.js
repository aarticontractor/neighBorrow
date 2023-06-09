import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import CartItem from '../components/CartItem.js';
import { useLazyQuery } from '@apollo/client';
import { idbPromise } from '../utils/helpers';
import DeleteBtn from '../components/DeleteBtn.js';

import './cart-page.css';
import Auth from '../utils/auth';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../utils/actions.js';
// import { useStoreContext } from '../../utils/globalState.js';
import { QUERY_CHECKOUT } from '../utils/queries.js';
import { useSelector, useDispatch } from 'react-redux';
// import { useStoreContext } from '../utils/globalState.js';
// import { useSelector } from 'react-redux';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

// const Cart = () => {
//     const [state, dispatch] = useStoreContext();
//     const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
const Cart = () => {
    const state = useSelector((state) => {
        return state;
    });
    const dispatch = useDispatch();
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise('cart', 'get');
            dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
        }

        if (!state.cart.length) {
            getCart();
        }
    }, [state.cart.length, dispatch]);

    useEffect(() => {
        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data]);



    function toggleCart() {
        dispatch({ type: TOGGLE_CART });
    }

    function calculateTotal() {
        let sum = 0;
        state.cart.forEach((item) => {
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
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

    // if (!state.cartOpen) {
    //     return (
    //         <div className="cart-closed" onClick={toggleCart}>
    //             <span role="img" aria-label="trash">
    //                 🛒
    //             </span>
    //         </div>
    //     );
    // }

    return (
        <div class='container'>
            <h1 id='title'>Shopping Cart</h1>
            <div className="cart">
                {state.cart.length ? (
                    <div className="cart-items" id='item'>
                        {state.cart.map((item) => (
                            <CartItem key={item._id} item={item} />
                        ))}

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
                        <h2 id="test">Shopping Cart</h2>
                        <span role="img" aria-label="shocked">
                            😱
                        </span>
                        You haven't added anything to your cart yet!
                    </h3>
                )}
            </div>
        </div>
    );

};

export default Cart;