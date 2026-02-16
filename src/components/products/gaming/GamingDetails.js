import { UNSAFE_ErrorResponseImpl, useParams } from "react-router-dom";
import '../../products/ProductsDetails.css'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../../context/CartContext";



const toSlug = (name) =>
    name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

export default function GamingDetails() {
    const [gaming, setGaming] = useState([])
    const { addToCart, increase, decrease, getItemQuantity } = useContext(CartContext);
    useEffect(() => {
        fetch('/assets/gaming.json')
            .then((res) => res.json())
            .then((data) => setGaming(data))
            .catch((err) => console.error("Error fetching products:", err));
    }, []);
    const { slug } = useParams();
    const product = gaming.find(p => toSlug(p.name) === slug);

    if (!product) return <div>Δεν βρέθηκε το προϊόν.</div>;
    const { name, img, price, desc } = product;

    return (
        <div className="details">
            <div className="details-container">
                <img src={product.img} alt={product.name} />
                <div className="details-info">
                    <h1 className="details-name">{product.name}</h1>
                    <p className="details-price"><strong>Price: {product.price} €</strong></p>
                    {getItemQuantity(product.id) === 0 ? (
                        <button
                            className="add-to-cart-btn-details"
                            onClick={() => addToCart(product)}
                            type="button"
                        >
                            Add to cart
                        </button>
                    ) : (
                        <div className="qty-controls-details">
                            <button onClick={() => decrease(product.id)}>-</button>
                            <span>{getItemQuantity(product.id)}</span>
                            <button onClick={() => increase(product.id)}>+</button>
                        </div>
                    )}
                </div>
            </div>
            <h2>Description</h2>
            <p className="details-desc"><strong>{product.desc}</strong></p>


        </div>

    );
}

