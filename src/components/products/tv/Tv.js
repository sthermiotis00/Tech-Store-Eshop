import '../../products/Products.css';

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";

const toSlug = (name) =>
  name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const Tv = () => {
  const [tvs, setTvs] = useState([]);
  const { addToCart, increase, decrease, getItemQuantity } = useContext(CartContext);

  useEffect(() => {
    fetch("/assets/tv.json")
      .then((res) => res.json())
      .then((data) => setTvs(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="products">
      <h3>Tv</h3>
      <div className="products-container">
        {tvs.map((t) => {
          const qty = getItemQuantity(t.id);

          return (
            <div className="products-group" key={t.id}>
              <Link className="products-links" to={`/tvs/${toSlug(t.name)}`}>
                <div className="products-img">
                  <img src={t.img} alt={t.name} />
                </div>
                <div className="products-label">{t.name}</div>
                <div className="products-price">{t.price} €</div>
              </Link>

              {qty === 0 ? (
                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(t)}
                  type="button"
                >
                  Add to cart
                </button>
              ) : (
                <div className="qty-controls">
                  <button onClick={() => decrease(t.id)}>-</button>
                  <span>{qty}</span>
                  <button onClick={() => increase(t.id)}>+</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tv;
