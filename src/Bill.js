import React from "react";
import { useLocation } from "react-router-dom";
import "./bill.css";

const Bill = () => {
  const location = useLocation();
  const { cart } = location.state || {};

  const calculateTotalAmount = () => {
    return cart.reduce(
      (totalAmount, item) => totalAmount + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="bill-container">
      <div className="bill-section">
        <h2 className="bill-header">Bill</h2>
        {cart && cart.length > 0 ? (
          <div className="bill-items">
            {cart.map((item) => (
              <div key={item.name} className="bill-item">
                <span className="bill-item-name">
                  <strong>{item.name}</strong>
                </span>
                <br></br>
                <span className="bill-item-quantity">
                  Quantity: {item.quantity}
                </span>
                <br></br>
                <span classNAme="bill-item-price">Price: {item.price}</span>
                <br></br>
                <span>Total: {item.price * item.quantity}</span>{" "}
                {/* Calculate the item total */}
              </div>
            ))}
            <p className="bill-total">
              Total Amount: <strong>{calculateTotalAmount()}</strong>
            </p>
          </div>
        ) : (
          <p className="bill-empty">No items in the cart.</p>
        )}
      </div>
    </div>
  );
};

export default Bill;
