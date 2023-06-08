import React, { useEffect, useRef } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Button } from '@material-ui/core';
import anime from 'animejs';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/action";
import { idbPromise } from "../utils/helpers";
import { useSelector } from 'react-redux';

const ProductCard = ({ product }) => {
    const nameRef = useRef(null);
    const priceRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state);

    const navigateToCart = () => {
        console.log('test');
        navigate('/Detail');
    }


    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === product._id);

        if (itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: product._id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
            idbPromise('cart', 'put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
        } else {
            dispatch({
                type: ADD_TO_CART,
                product: { ...product, purchaseQuantity: 1 }
            });
            idbPromise('cart', 'put', { ...product, purchaseQuantity: 1 });
        }
    }

    // const { image, name, _id, price, quantity } = product;

    useEffect(() => {
        anime({
            targets: [nameRef.current, priceRef.current],
            scale: [0.1, 1],
            opacity: [0, 1],
            delay: anime.stagger(100),
            easing: 'spring(1, 80, 10, 0)'
        });
    }, []);

    const addToCartHandler = () => {
        // Implement your add to cart logic here
    };

    return (
        <Card>
            {/* <CardActionArea onClick={() => onProductClick(product)}> */}
            <CardMedia
                component="img"
                alt={product.name}
                height="140"
                image={product.image}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" ref={nameRef}>
                    {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" ref={priceRef}>
                    ${product.price}
                </Typography>
            </CardContent>
            {/* </CardActionArea> */}
            <Link to={'/Detail'}>

                <Button onClick={() => { addToCart(); navigateToCart(); }} variant="contained" color="primary">
                    Add to Cart
                </Button>
            </Link>
        </Card>
    );
};


export default ProductCard;