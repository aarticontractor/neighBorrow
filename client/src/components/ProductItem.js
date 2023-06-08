import React from "react";

import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
// import { useStoreContext } from "../../utils/globalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/action";
import { idbPromise } from "../utils/helpers";
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';


function ProductItem(item) {
    const navigate = useNavigate();
    const state = useSelector((state) => {
        return state;
    });
    const dispatch = useDispatch();
    const { cart } = state;
    const navigateToCart = () => {
        console.log('test');
        navigate('/Detail');
    }


    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === _id);

        if (itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: _id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
            idbPromise('cart', 'put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
        } else {
            dispatch({
                type: ADD_TO_CART,
                product: { ...item, purchaseQuantity: 1 }
            });
            idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
        }
    }
    const { image, name, _id, price, quantity } = item;

    return (
        <div className="productCard">
            <Link to={`/products/${_id}`}>
                <img
                    alt={name}
                    src={`/images/${image}`}
                />
                <p>{name}</p>
            </Link>
            <div>
                <div>{quantity} {pluralize("item", quantity)} in stock</div>
                <span>${price}</span>
            </div>
            <Button onClick={() => { addToCart(); navigateToCart(); }} variant="contained" color="primary">
                Add to Cart
            </Button>
        </div>
    );
}

export default ProductItem;
