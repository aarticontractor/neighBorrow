import React, { useEffect, useRef } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Button } from '@material-ui/core';
import anime from 'animejs';

const ProductCard = ({ product, onProductClick, disabled }) => {
    const nameRef = useRef(null);
    const priceRef = useRef(null);

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
            <CardActionArea onClick={() => onProductClick(product)}>
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
            </CardActionArea>
            <Button disabled={disabled} onClick={addToCartHandler}>
                {disabled ? 'Unavailable' : 'Add to Cart'}
            </Button>
        </Card>
    );
};

export default ProductCard;