import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
import { Card, CardActionArea, CardContent, CardMedia, Typography, } from '@material-ui/core';
import anime from 'animejs';
import "../index.css";
// import { useNavigate } from 'react-router-dom';





const ProductCard = ({ product, onProductClick, disabled }) => {
    const nameRef = useRef(null);
    const priceRef = useRef(null);
    // const navigate = useNavigate();
    // const navigateToDetail = () => {
    //     navigate('/Detail');
    // }
    // const state = useSelector((state) => {
    //     return state;
    // });
    // const dispatch = useDispatch();

    useEffect(() => {
        anime({
            targets: [nameRef.current, priceRef.current],
            scale: [0.1, 1],
            opacity: [0, 1],
            delay: anime.stagger(100),
            easing: 'spring(1, 80, 10, 0)'
        });
    }, []);


    // const addToCartHandler = () => {
    //     // Implement your add to cart logic here
    // };

    // const { image, name, _id, price, description } = item;

    return (
        <Card>
            <CardActionArea>
                <Link to={`/products/${product._id}`}>
                    <CardMedia
                        component="img"
                        alt={product.name}
                        height="140"
                        image={product.image}
                        title={product.name}
                    />
                </Link>
            </CardActionArea>
            <CardContent>
                <Link to={`/products/${product._id}`}>
                    <Typography gutterBottom variant="h5" component="div" ref={nameRef}>
                        {product.name}
                    </Typography>
                </Link>
                <Typography variant="body2" color="textSecondary" ref={priceRef}>
                    ${product.price}
                </Typography>
            </CardContent >
            {/* <Button disabled={disabled} onClick={addToCartHandler}>
                {disabled ? 'Unavailable' : 'Add to Cart'}
            </Button> */}
            {/* <Button onClick={addToCart} variant="contained" color="primary">
                Add To Cart
            </Button> */}

            {/* <Button disabled={disabled} onClick={addToCartHandler}>
                {disabled ? 'Unavailable' : 'Add to Cart'}
            </Button> */}
        </Card >
    );
};


export default ProductCard;