import React from 'react';
// import { useStoreContext } from "../utils/globalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from "../utils/helpers";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


const CartItem = ({ item }) => {

    // const state = useSelector((state) => {
    //     return state;
    // });

    const dispatch = useDispatch();

    const removeFromCart = item => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: item._id
        });
        idbPromise('cart', 'delete', { ...item });

    };

    const onChange = (e) => {
        const value = e.target.value;
        if (value === '0') {
            dispatch({
                type: REMOVE_FROM_CART,
                _id: item._id
            });
            idbPromise('cart', 'delete', { ...item });

        } else {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: item._id,
                purchaseQuantity: parseInt(value)
            });
            idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });

        }
    }

    return (
        <div className="flex-row">
            <Link to={`/products/${item._id}`}>
                <div className='cart-item-details'>
                    <img
                        src={`/images/${item.image}`}
                        alt=""
                    />
                    <div>{item.name}, ${item.price}</div>
                </div>

            </Link>
            <div>
                <span>Qty:</span>
                <input
                    type="number"
                    placeholder="1"
                    value={item.purchaseQuantity}
                    onChange={onChange}
                />
                <span
                    role="img"
                    aria-label="trash"
                    onClick={() => removeFromCart(item)}
                >
                    🗑️
                </span>
            </div>
        </div>

    );
}

export default CartItem;
