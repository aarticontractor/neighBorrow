import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Button } from '@material-ui/core';

const ProductCard = ({ product, onProductClick }) => {
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
                    <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        ${product.price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Button variant="contained" color="primary">Add to Cart</Button>
        </Card>
    );
}

export default ProductCard;