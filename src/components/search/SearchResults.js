import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const toSlug = (name = "") =>
  name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

function SearchResults() {
  const { results } = useContext(SearchContext);
  const { addToCart, increase, decrease, getItemQuantity } = useContext(CartContext);
  const navigate = useNavigate();
  const routeMap = {
    phones: "/phones",
    laptops: "/laptops",
    gaming: "/gaming",
    smartwatches: "/smartwatches",
    tv: "/tvs",
  };

  return (
    <div className="products-container">
      {results.map(p => (
        <div className="products-group" key={p.id}>
          <div
            className="products-clickable"
            style={{ cursor: "pointer" }}
            onClick={() => {
              const base = routeMap[p.category];
              navigate(`${base}/${toSlug(p.name)}`);
            }}
          >
            <div className="products-img">
              <img src={p.img} alt={p.name} />
            </div>
            <div className="products-label">{p.name}</div>
            <div className="products-price">{p.price} €</div>
          </div>

          {getItemQuantity(p.id) === 0 ? (
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
              <span>{getItemQuantity(p.id)}</span>
              <button onClick={() => increase(p.id)}>+</button>
            </div>
          )}
        </div>
      ))}
    </div>


  );
}

export default SearchResults;
