import React, { useState } from "react";
import { generateNewOrderId, createOrder } from "../../firebase/firebase-order";

export const CartCheckout = ({ totalAmount, productIds, userId }) => {
  const [shippingMode, setShippingMode] = useState("pickup");

  const shippingCost = shippingMode === "delivery" ? 10.0 : 0.0;
  const totalPrice = totalAmount + shippingCost;

  const handleShippingChange = (event) => {
    setShippingMode(event.target.value);
  };

  const handleCheckout = async () => {
    try {
      const orderId = await generateNewOrderId(userId);
      const orderDetails = {
        shippingFee: shippingCost,
        subTotal: totalAmount.toFixed(2),
        products: productIds,
      };
      await createOrder(userId, orderId, orderDetails);
      console.log("Checkout successful!");
    } catch (error) {
      console.error("Error during checkout:", error.message);
    }
  };
  
  return (
    <div className="cart-checkout">
      <div className="shipping-mode">
        <h2>Choose Shipping Mode:</h2>
        <form className="button-container">
          <input
            type="radio"
            name="shipping"
            value="pickup"
            id="pick-up"
            checked={shippingMode === "pickup"}
            onChange={handleShippingChange}
          />
          <label htmlFor="pick-up">
            Store Pick Up<span>•</span>
            <span>Php 0.00</span>
          </label>

          <input
            type="radio"
            name="shipping"
            value="delivery"
            id="delivery"
            checked={shippingMode === "delivery"}
            onChange={handleShippingChange}
          />
          <label htmlFor="delivery">
            Delivery<span>•</span>
            <span>Php 10.00</span>
          </label>
        </form>
      </div>

      <div className="total-container">
        <div className="sub-total">
          <p className="label">Sub Total</p>
          <p className="price">Php {totalAmount.toFixed(2)}</p>
        </div>

        <div className="shipping">
          <p className="label">Shipping</p>
          <p className="price">Php {shippingCost.toFixed(2)}</p>
        </div>

        <div className="line"></div>

        <div className="total">
          <p className="label">Total</p>
          <p className="price">Php {totalPrice.toFixed(2)}</p>
        </div>

        <button className="cocButton" onClick={handleCheckout}>
          Check Out Now
        </button>
      </div>
    </div>
  );
};
