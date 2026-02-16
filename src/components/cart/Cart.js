
import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import CartItem from "./CartItem";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { OrdersContext } from "../../context/OrdersContext";


function Cart() {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);
  const { createOrder } = useContext(OrdersContext);

  const handleCheckout = () => {
    if (!cartItems || cartItems.length === 0) return;

    createOrder({ items: cartItems, total: totalPrice });
    clearCart();
    navigate("/orders");
  };

  if (!cartItems || cartItems.length === 0) {
    return <h2 className="cart-empty">Your cart is empty</h2>;
  }

  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Cart</h2>

      <div className="cart-grid">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: {Number(totalPrice).toFixed(2)} €</h3>
        <button type="button" onClick={handleCheckout} className="checkout-btn">
          Check out
        </button>
        <button onClick={clearCart} className="btn-clear">
          Clear cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
