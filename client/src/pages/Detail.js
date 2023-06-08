// import React, { useEffect, useState } from 'react';

// import { useQuery } from '@apollo/client';

// import Cart from '../components/Cart/Cart';
// import { useStoreContext } from '../utils/globalState';
// import {
//     REMOVE_FROM_CART,
//     UPDATE_CART_QUANTITY,
//     ADD_TO_CART,
//     UPDATE_PRODUCTS,
// } from '../utils/action';
// import { QUERY_PRODUCTS } from '../utils/queries';
// import { idbPromise } from '../utils/helpers';



// function Detail() {

//     const reduxState = useSelector((state) => {
//         return state;
//     });


//     const [currentProduct, setCurrentProduct] = useState({});
//     const dispatch = useDispatch();
//     const { loading, data } = useQuery(QUERY_PRODUCTS);

//     const { products, cart } = reduxState;

//     useEffect(() => {

//         if (products.length) {
//             setCurrentProduct(products.find((product) => product._id === id));
//         }
//         // retrieved from server
//         else if (data) {
//             dispatch({
//                 type: UPDATE_PRODUCTS,
//                 products: data.products,
//             });

//             data.products.forEach((product) => {
//                 idbPromise('products', 'put', product);
//             });
//         }
//         // get cache from idb
//         else if (!loading) {
//             idbPromise('products', 'get').then((indexedProducts) => {
//                 dispatch({
//                     type: UPDATE_PRODUCTS,
//                     products: indexedProducts,
//                 });
//             });
//         }
//     }, [products, data, loading, dispatch, id]);


// return (
//     <Cart />
// )



// export default Detail;
