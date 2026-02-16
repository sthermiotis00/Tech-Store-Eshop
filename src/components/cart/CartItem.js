// src/components/cart/CartItem.js
import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./Cart.css";

function CartItem({ item }) {
  const { increase, decrease, removeFromCart } = useContext(CartContext);

  return (
    <div className="cart-card">
      <img className="cart-card-img" src={item.img} alt={item.name} />

      <h4 className="cart-card-name">{item.name}</h4>
      <p className="cart-card-price">{item.price} €</p>

      <div className="cart-qty">
        <button className="qty-btn" onClick={() => decrease(item.id)}>-</button>
        <span className="qty-value">{item.quantity}</span>
        <button className="qty-btn" onClick={() => increase(item.id)}>+</button>
      </div>

      <button className="btn-remove" onClick={() => removeFromCart(item.id)}>
        Remove
      </button>
    </div>
  );
}

export default CartItem;
