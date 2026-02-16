import '../../products/Products.css';

import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../../context/CartContext";

const toSlug = (name) =>
  name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const Smartwatches = () => {
  const [smartwatches, setSmartwatches] = useState([]);
  const { addToCart, increase, decrease, getItemQuantity } = useContext(CartContext);

  useEffect(() => {
    fetch("/assets/smartwatches.json")
      .then((res) => res.json())
      .then((data) => setSmartwatches(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="products">
      <h3>Smartwatches</h3>
      <div className="products-container">
        {smartwatches.map((s) => {
          const qty = getItemQuantity(s.id);

          return (
            <div className="products-group" key={s.id}>
              <Link className="products-links" to={`/smartwatches/${toSlug(s.name)}`}>
                <div className="products-img">
                  <img src={s.img} alt={s.name} />
                </div>
                <div className="products-label">{s.name}</div>
                <div className="products-price">{s.price} €</div>
              </Link>

              {qty === 0 ? (
                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(s)}
                  type="button"
                >
                  Add to cart
                </button>
              ) : (
                <div className="qty-controls">
                  <button onClick={() => decrease(s.id)}>-</button>
                  <span>{qty}</span>
                  <button onClick={() => increase(s.id)}>+</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Smartwatches;
