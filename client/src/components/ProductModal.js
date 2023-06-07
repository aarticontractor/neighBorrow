import React from 'react';
import { Modal, Card, CardContent, CardMedia, Typography, IconButton, Box, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';




const ProductModal = ({ product, open, onClose }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                }}
            >
                <Card
                    sx={{
                        maxWidth: '80%', // Set to the maximum size you want your modal to be. Adjust as needed.
                        maxHeight: '11180vh', // Set to the maximum size you want your modal to be. Adjust as needed.
                        overflowY: 'auto',
                        position: 'relative',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <IconButton onClick={onClose} sx={{ position: 'absolute', right: 0, top: 0 }}>
                        <CloseIcon />
                    </IconButton>
                    <CardMedia
                        component="img"
                        alt={product.name}
                        height="500"
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
                    <Button variant="contained" color="primary">Add to Cart</Button>
                </Card>
            </Box>
        </Modal>
    );
}


export default ProductModal;
