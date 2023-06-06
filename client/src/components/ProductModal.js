import React from 'react';
import { Modal, Card, CardContent, CardMedia, Typography, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const ProductModal = ({ product, open, onClose }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Card>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
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
                    <Typography variant="body2" color="text.secondary">
                        {product.description}
                    </Typography>
                </CardContent>
            </Card>
        </Modal>
    );
}

export default ProductModal;