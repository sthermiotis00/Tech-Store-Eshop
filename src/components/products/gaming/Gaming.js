import '../../products/Products.css'
import '../../products/ProductsDetails.css'
import { Link } from 'react-router-dom'
import React from 'react'

import { useState, useEffect, useContext } from 'react'
import { CartContext } from '../../../context/CartContext'

const toSlug = (name) =>
    name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
const Gaming = () => {
    const [gaming, setGaming] = useState([])
    const { addToCart, increase, decrease, getItemQuantity } = useContext(CartContext);
    useEffect(() => {
        fetch('/assets/gaming.json')
            .then((res) => res.json())
            .then((data) => setGaming(data))
            .catch((err) => console.error("Error fetching products:", err));
    }, []);
    return (
        <div className='products'>
            <h3>Gaming</h3>
            <div className='products-container'>

                {gaming.map((g) => {
                    const qty = getItemQuantity(g.id);

                    return (
                        <div className="products-group" key={g.id}>
                            <Link className="products-links" to={`/gaming/${toSlug(g.name)}`}>
                                <div className="products-img">
                                    <img src={g.img} alt={g.name} />
                                </div>
                                <div className="products-label">{g.name}</div>
                                <div className="products-price">{g.price} €</div>
                            </Link>

                            {qty === 0 ? (
                                <button
                                    className="add-to-cart-btn"
                                    onClick={() => addToCart(g)}
                                >
                                    Add to cart
                                </button>
                            ) : (
                                <div className="qty-controls">
                                    <button onClick={() => decrease(g.id)}>-</button>
                                    <span>{qty}</span>
                                    <button onClick={() => increase(g.id)}>+</button>
                                </div>
                            )}
                        </div>
                    );
                })}


            </div>

        </div >
    )
}

export default Gaming
