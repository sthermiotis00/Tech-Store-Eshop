import './Navbar.css'
import React from 'react'
import Cart from '../cart/Cart'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { CartContext } from '../../context/CartContext'
import { SearchContext } from "../../context/SearchContext";
import order from "../../assets/order-now.png"
import home from "../../assets/home.png"
import cart from "../../assets/cart.png"



const Navbar = () => {
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search");
  };
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      navigate("/search");
    }
  }, [searchTerm, navigate])

  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <div className="brand">
          <a href="/">Tech-Store</a>
        </div>

        <div className="search">
          <form onSubmit={handleSubmit} className="search-form">

            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              aria-label="Search"

            />
            <button type="submit" className="submit-btn" aria-label="Αναζήτηση">
              Search
            </button>
          </form>

        </div>

        <div className="menu">
          <a href="/"><img src={home} className='nav-img'/></a>
          <Link to="/cart" className="cart-link"><img src={cart} className='nav-img'/>
            
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <Link to="/orders"><img src={order} className='nav-img'/></Link>

        </div>
      </div>
    </div>
  )
}

export default Navbar
