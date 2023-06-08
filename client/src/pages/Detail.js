import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// import { useSelector, useDispatch } from 'react-redux';
import Cart from '../components/Cart/Cart';
import { useStoreContext } from '../utils/globalState';
import {
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    ADD_TO_CART,
    UPDATE_PRODUCTS,
} from '../utils/action';
import { QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';



function Detail() {

    const [reduxState, dispatch] = useStoreContext();
    const { id } = useParams();

    const [currentProduct, setCurrentProduct] = useState({});

    const { loading, data } = useQuery(QUERY_PRODUCTS);

    const { products, cart } = reduxState;

    useEffect(() => {

        if (products.length) {
            setCurrentProduct(products.find((product) => product._id === id));
        }
        // retrieved from server
        else if (data) {
            dispatch({
                type: UPDATE_PRODUCTS,
                products: data.products,
            });

            data.products.forEach((product) => {
                idbPromise('products', 'put', product);
            });
        }
        // get cache from idb
        else if (!loading) {
            idbPromise('products', 'get').then((indexedProducts) => {
                dispatch({
                    type: UPDATE_PRODUCTS,
                    products: indexedProducts,
                });
            });
        }
    }, [products, data, loading, dispatch, id]);

    const addToCart = () => {

        const itemInCart = cart.find((cartItem) => cartItem._id === id);
        if (itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: id,
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

    return (
        <>
            <h1>Your Shopping Cart</h1>
            {currentProduct && cart ? (
                <div className="container my-1">
                    <Link to="/">← Back to Products</Link>

                    <h2>{currentProduct.name}</h2>

                    <p>{currentProduct.description}</p>

                    <p>
                        <strong>Price:</strong>${currentProduct.price}{' '}
                        <button disabled={!cart.find((p) => p._id === currentProduct._id)} onClick={addToCart}>Add to Cart</button>
                        <button

                            onClick={removeFromCart}
                        >
                            Remove from Cart
                        </button>
                    </p>

                    <img
                        src={`/images/${currentProduct.image}`}
                        alt={currentProduct.name}
                    />
                </div>
            ) : null}
            {/* LOADING IMAGE?  */}
            {/* {loading ? <img src={} alt="loading" /> : null}  */}
            <Cart />
        </>
    );
}

export default Detail;
