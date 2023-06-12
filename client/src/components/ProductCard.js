import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box } from '@material-ui/core';
import anime from 'animejs';
import { makeStyles } from '@material-ui/core/styles';
import { getAvailability } from '../utils/checkDate';

const useStyles = makeStyles((theme) => ({
    productCard: {
        transition: '0.3s',
        boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
        '&:hover': {
            boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)'
        },
        textAlign: 'center'
    },
    availability: {
        color: props => props.color
    }
}));

const ProductCard = ({ product, onProductClick, disabled }) => {
    const nameRef = useRef(null);
    const priceRef = useRef(null);

    const availability = getAvailability(product.start_date, product.end_date);
    const classes = useStyles({ color: availability.color });

    useEffect(() => {
        anime({
            targets: [nameRef.current, priceRef.current],
            scale: [0.1, 1],
            opacity: [0, 1],
            delay: anime.stagger(100),
            easing: 'spring(1, 80, 10, 0)'
        });
    }, []);

    return (
        <Card className={classes.productCard}>
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
                <Typography variant="body2" className={classes.availability}>
                    {availability.status}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
