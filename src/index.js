import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";
import { OrdersProvider } from './context/OrdersContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SearchProvider>
    <OrdersProvider>
      <CartProvider>
        <React.StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </React.StrictMode>

      </CartProvider>
    </OrdersProvider>
  </SearchProvider>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
