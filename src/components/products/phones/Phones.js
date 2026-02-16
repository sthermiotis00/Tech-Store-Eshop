import '../../products/Products.css';

import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../../context/CartContext";

const toSlug = (name) =>
  name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const Phones = () => {
  const [phones, setPhones] = useState([]);
  const { addToCart, increase, decrease, getItemQuantity } = useContext(CartContext);

  useEffect(() => {
    fetch("/assets/phones.json")
      .then((res) => res.json())
      .then((data) => setPhones(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="products">
      <h3>Phones</h3>
      <div className="products-container">
        {phones.map((p) => {
          const qty = getItemQuantity(p.id);

          return (
            <div className="products-group" key={p.id}>
              <Link className="products-links" to={`/phones/${toSlug(p.name)}`}>
                <div className="products-img">
                  <img src={p.img} alt={p.name} />
                </div>
                <div className="products-label">{p.name}</div>
                <div className="products-price">{p.price} €</div>
              </Link>

              {qty === 0 ? (
                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(p)}
                  type="button"
                >
                  Add to cart
                </button>
              ) : (
                <div className="qty-controls">
                  <button onClick={() => decrease(p.id)}>-</button>
                  <span>{qty}</span>
                  <button onClick={() => increase(p.id)}>+</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Phones;
