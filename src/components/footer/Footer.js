import './Footer.css'
import React from 'react'
import git from '../../assets/github.png'
import link from '../../assets/linkedin.png'
import order from "../../assets/order-now.png"
import home from "../../assets/home.png"
import cart from "../../assets/cart.png"
import { Link } from 'react-router-dom'
import "../../components/navbar/Navbar.css"
import { CartContext } from '../../context/CartContext'
import { useContext } from 'react'

const Footer = () => {
    const { cartCount } = useContext(CartContext);
    return (
        <footer className='footer-container'>
            <div className='footer-inner'>
                <div className='col contact'>
                    <h3>Contact</h3>
                    <p>Phone: <a href="tel:6955769343">6955769343</a></p>
                    <p> Email:{" "} <a href="mailto:sthermiotis00@gmail.com">sthermiotis00&#64;gmail.com</a></p>
                </div>
                <div className='col links'>
                    <h3>Quick Links</h3>
                    <a href="/"><img src={home} className='nav-img' /></a>
                    <Link to="/cart" className="cart-link"><img src={cart} className='nav-img' />
                     {cartCount > 0 && <span className="cart-badge-footer">{cartCount}</span>}
                    </Link>
                    <Link to="/orders"><img src={order} className='nav-img' /></Link>
                </div>

                <div className='col socials'>
                    <h3 className='mysocials'>My socials </h3>
                    <a href='https://github.com/sthermiotis00' className='sociallink'><img src={git} className='img'></img></a>
                    <a href='https://www.linkedin.com/in/stylianos-thermiotis-819424252/' className='sociallink'> <img src={link} className='img'></img> </a>
                </div>
            </div>

            <div className='copyrights'>
                <p className='copy'>&copy; Stylianos Thermiots. All rights reserved</p>
            </div>
        </footer>

    )
}

export default Footer
