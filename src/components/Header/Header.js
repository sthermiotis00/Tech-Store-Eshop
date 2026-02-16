import './Header.css'
import React, { useEffect, useState } from 'react'
import phones from '../../assets/smartphone.webp'
import watch from '../../assets/products/smartwatches/ultra2.png'
import laptops from '../../assets/macbook.png'
import tv from '../../assets/tv.webp'
import gaming from '../../assets/gaming.png'
import iphone from '../../assets/iphone17pro.png'
import mac from '../../assets/macbook.png'
import ps5 from '../../assets/ps5.png'
import s24 from '../../assets/s24.png'
import Phones from '../products/phones/Phones'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { useContext } from 'react'









const categ = [
    { name: 'Phones', img: phones, url: '/phones' },
    { name: 'Smartwatches', img: watch, url: '/smartwatches' },
    { name: 'Laptops', img: laptops, url: '/laptops' },
    { name: 'Tv', img: tv, url: '/tvs' },
    { name: 'Gaming', img: gaming, url: '/gaming' }
]
const Header = () => {
    const [seller, setSeller] = useState([])
    const { addToCart, increase, decrease, getItemQuantity } = useContext(CartContext);


    useEffect(() => {
        fetch('/assets/products.json')
            .then((res) => res.json())
            .then((data) => setSeller(data))
            .catch((err) => console.error("Error fetching products:", err));
    }, []);

    return (
        <div className='header-container'>
            <h3>Products</h3>
            <div className='categories'>
                {categ.map((c, index) => (
                    <div className='group'>
                        <Link className="card" to={c.url} key={c.name}>
                            <div className="thumb"><img src={c.img} alt={c.name} /></div>
                            <div className="label">{c.name}</div>
                        </Link>

                    </div>
                ))}

            </div>


            <h3 >Best Sellers</h3>

            <div className='seller-container' >
                {seller.map((s, index) => (
                    <div className='seller-group '>
                        <Link className='seller-links' to={s.url} key={s.name}>
                            <div className="seller-img"><img src={s.img} alt={s.name} /></div>
                            <Link className='seller-linkscateg' to={s.categurl}><div className="seller-categories">{s.categoris}</div></Link>
                            <div className="seller-label">{s.name}</div>
                            <div className="seller-price">{s.price} €</div>
                        </Link>
                        {getItemQuantity(s.id) === 0 ? (
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
                                <span>{getItemQuantity(s.id)}</span>
                                <button onClick={() => increase(s.id)}>+</button>
                            </div>
                        )}

                    </div>

                ))}




            </div>
        </div>
    )
}

export default Header
