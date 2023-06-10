import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { idbPromise } from '../utils/helpers';
// import Cart from '../components/Cart/Cart';
import { useSelector, useDispatch } from 'react-redux';
import {
    // REMOVE_FROM_CART,
    UPDATE_PRODUCTS,
    UPDATE_CART_QUANTITY,
    ADD_TO_CART
} from '../utils/actions';
import { GET_ALL_PRODUCTS } from '../utils/queries';
// import CartItem from '../components/CartItem.js';



function Detail() {
    const state = useSelector((state) => {
        return state;
    });
    const { id } = useParams();
    console.log(' id :', id);

    const [currentProduct, setCurrentProduct] = useState({});
    const dispatch = useDispatch();
    const { loading, data } = useQuery(GET_ALL_PRODUCTS);

    const { products, cart } = state || {};

    useEffect(() => {
        // already in global store
        if (products.length) {
            console.log('products :', products);
            setCurrentProduct(products.find((product) => product._id === id));
            console.log('urrentProduct :', currentProduct);
        }
        // retrieved from server
        else if (data) {
            console.log('data :', data);
            dispatch({
                type: UPDATE_PRODUCTS,
                products: data.getProducts,
            });

            data.getProducts.forEach((product) => {
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

    // const removeFromCart = () => {

    //     dispatch({
    //         type: REMOVE_FROM_CART,
    //         _id: currentProduct._id,
    //     });

    //     idbPromise('cart', 'delete', { ...currentProduct });

    // };

    return (
        <>
            {/* {currentProduct ( */}
            <div className="container my-1">
                <Link to="/">← Back to Products</Link>
                <Link to="/cart"> Go to cart</Link>


                <h2>{currentProduct.name}</h2>

                <p>{currentProduct.description}</p>

                <p>
                    <strong>Price:</strong>${currentProduct.price}{' '}
                    <div><Link to='/cart'>

                        <button onClick={addToCart}>Add to Cart</button></Link>
                    </div>
                    {/* <button
                    disabled={!cart.find((p) => p._id === currentProduct._id)}
                    onClick={removeFromCart}
                >
                    Remove from Cart
                </button> */}
                </p>

                <img
                    src={currentProduct.image}
                    alt={currentProduct.name}
                />

            </div>
            {/* // ) : null} */}
            {/* {loading ? <img src={spinner} alt="loading" /> : null} */}
            {/* <Cart /> */}
        </>
    );
}

export default Detail;