import '../../products/Products.css';

import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../../context/CartContext";

const toSlug = (name) =>
  name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const Laptops = () => {
  const [laptops, setLaptops] = useState([]);
  const { addToCart, increase, decrease, getItemQuantity } = useContext(CartContext);

  useEffect(() => {
    fetch("/assets/laptops.json")
      .then((res) => res.json())
      .then((data) => setLaptops(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="products">
      <h3>Laptops</h3>
      <div className="products-container">
        {laptops.map((l) => {
          const qty = getItemQuantity(l.id);

          return (
            <div className="products-group" key={l.id}>
              <Link className="products-links" to={`/laptops/${toSlug(l.name)}`}>
                <div className="products-img">
                  <img src={l.img} alt={l.name} />
                </div>
                <div className="products-label">{l.name}</div>
                <div className="products-price">{l.price} €</div>
              </Link>

              {qty === 0 ? (
                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(l)}
                  type="button"
                >
                  Add to cart
                </button>
              ) : (
                <div className="qty-controls">
                  <button onClick={() => decrease(l.id)}>-</button>
                  <span>{qty}</span>
                  <button onClick={() => increase(l.id)}>+</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Laptops;

