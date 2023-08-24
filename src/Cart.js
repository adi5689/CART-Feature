import React, { useReducer } from 'react';
import './cart.css';
import { useNavigate,Route, Routes } from 'react-router-dom'; // Import useHistory
import Bill from './Bill'; 
// import { Link } from 'react-router-dom';

const products = [
    {
        name: "Johnnie Walker (Whiskey)",
        price: 600
    },
    {
        name: "Old Monk (Rum)",
        price: 800
    },
    {
        name: "Magic Moments (Vodka)",
        price: 500
    },
    {
        name: "Budweiser Magnum (Beer)",
        price: 250
    },
];

// function getTotal(cart) {
    // return cart.reduce((totalCost, item) => totalCost + item.price, 0);
// }

function perProduct(cart, productName) {
    const item = cart.find(item => item.name === productName);
    return item ? item.quantity : 0;
}

function shoppingCartReducer(state, action) {
    switch (action.type) {
        case 'add':
            const existingItem = state.find(item => item.name === action.product.name);
            if (existingItem) {
                // If the item already exists, update its quantity
                return state.map(item =>
                    item.name === action.product.name ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // If the item doesn't exist in the cart, add it with quantity 1
                return [...state, { ...action.product, quantity: 1 }];
            }
        case 'remove':
            const itemIndex = state.findIndex(item => item.name === action.product.name);
            if (itemIndex !== -1) {
                const updatedState = [...state];
                if (updatedState[itemIndex].quantity > 1) {
                    // If quantity > 1, reduce quantity
                    updatedState[itemIndex].quantity--;
                } else {
                    // If quantity is 1, remove the item from cart
                    updatedState.splice(itemIndex, 1);
                }
                return updatedState;
            }
            return state;
        default:
            return state;
    }
}



export default function Product() {
    const navigate = useNavigate();
    const [ cart, dispatch ] = useReducer(shoppingCartReducer, []);
    // const total = getTotal(cart);

    function add(product) {
        const action = { product, type: "add"};
        dispatch(action);
    }

    function remove(product) {
        const action = { product, type: "remove"};
        dispatch(action);
    }

    function handleCheckout() {
        // Navigate to the Bill component programmatically
        navigate('/bill', { state: { cart } });
    }

    const calculateTotalAmount = () => {
        return cart.reduce((totalAmount, item) => totalAmount + item.price * item.quantity, 0);
      }

    return (
        <div className="cart-container">
        <div className="cart-section">
            <div className="cart-summary">
                <strong>LIQUOR CART</strong>
                <div className="total-items"> Total Items: {cart.reduce((totalItems, item) => totalItems + item.quantity, 0)}</div>
                <div className="total-price">Total Price: {calculateTotalAmount()} Rupees</div>
            </div>
            <div className="cart-items">
                {products.map((product) => (
                    <div className="cart-item" key={product.name}>
                        <div>
                            <span>{product.name}</span>
                        </div>
                        <div className="cart-buttons">
                            <button className="Cart-button" onClick={() => remove(product)}>-</button>
                            <b>{perProduct(cart, product.name)}</b>
                            <button className="Cart-button" onClick={() => add(product)}>+</button>
                        </div>
                    </div>
                ))}
            </div>
            <br></br>
            <div className="checkout-button-container">
                <button onClick={handleCheckout} className="checkout-button">Checkout</button>
            </div>
            <Routes>
                <Route path="/bill" element={<Bill />}></Route>
            </Routes>
        </div>
    </div>
);
}





