// import React from 'react';
// import { Modal, Card, CardContent, CardMedia, Typography, IconButton, Box, Button } from '@material-ui/core';
// import CloseIcon from '@material-ui/icons/Close';
// import { idbPromise } from "../utils/helpers";

// import { useSelector, useDispatch } from 'react-redux';
// import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/actions";

// import { useNavigate } from 'react-router-dom';
// import { useProductReducer } from '../utils/reducers';
// import { checkDate } from '../utils/checkDate';
// import Auth from '../utils/auth';

// const ProductModal = ({ product, open, onClose }) => {
//     const navigate = useNavigate();
//     const [state, dispatch] = useProductReducer();
//     const { cart } = state;
//     const { image, name, _id, price } = product;

//     const navigateToDetail = () => {
//         navigate('/Detail');
//     }

//     const addToCart = () => {
//         const itemInCart = cart.find((cartItem) => cartItem._id === _id);

//         if (itemInCart) {
//             dispatch({
//                 type: UPDATE_CART_QUANTITY,
//                 _id: _id,
//                 purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
//             });
//             idbPromise('cart', 'put', {
//                 ...itemInCart,
//                 purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
//             });
//         } else {
//             dispatch({
//                 type: ADD_TO_CART,
//                 product: { ...product, purchaseQuantity: 1 }
//             });
//             idbPromise('cart', 'put', { ...product, purchaseQuantity: 1 });
//         }
//     };

//     const disabled = !Auth.loggedIn() || !checkDate(product.start_date, product.end_date);

//     return (
//         <Modal open={open} onClose={onClose}>
//             <Box
//                 sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     width: '100%',
//                     height: '100%',
//                 }}
//             >
//                 <Card
//                     sx={{
//                         maxWidth: '80%',
//                         maxHeight: '80vh',
//                         overflowY: 'auto',
//                         position: 'relative',
//                         bgcolor: 'background.paper',
//                         boxShadow: 24,
//                         p: 4,
//                     }}
//                 >
//                     <IconButton onClick={onClose} sx={{ position: 'absolute', right: 0, top: 0 }}>
//                         <CloseIcon />
//                     </IconButton>
//                     <CardMedia
//                         component="img"
//                         alt={name}
//                         height="500"
//                         image={image}
//                         title={name}
//                     />
//                     <CardContent>
//                         <Typography gutterBottom variant="h5" component="div">
//                             {name}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                             ${price}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                             <h1>test</h1>
//                             {/* {product.description} */}
//                         </Typography>
//                         <Button onClick={navigateToDetail} variant="contained" color="primary">
//                             Details
//                         </Button>
//                         <Button onClick={addToCart} variant="contained" color="primary">
//                             Add to cart
//                         </Button>

//                     </CardContent>

//                     <Button onClick={() => { addToCart(); navigateToCart(); }} variant="contained" color="primary" disabled={disabled}>
//                         Add to Cart
//                     </Button>
//                 </Card>
//             </Box>
//         </Modal>
//     );
// };

// export default ProductModal;