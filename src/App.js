import './App.css';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Phones from './components/products/phones/Phones';
import PhoneDetails from "./components/products/phones/PhoneDetails";
import Laptops from './components/products/laptops/Laptops';
import LaptopsDetails from './components/products/laptops/LaptopsDetails';
import Gaming from './components/products/gaming/Gaming';
import GamingDetails from './components/products/gaming/GamingDetails';
import SmartwatchesDetails from './components/products/smarwatches/SmartwatchesDetails';
import Smartwatches from './components/products/smarwatches/Smartwatches'
import Tv from './components/products/tv/Tv';
import TvDetails from './components/products/tv/TvDetails';
import Cart from './components/cart/Cart'
import SearchResults from './components/search/SearchResults';
import Orders from './components/orders/Orders';




function App() {
  return (
    <div className="app">
  
      <Navbar />

      <Routes >
        <Route path="/" element={<Home /> }/>
        <Route path='/phones' element={<Phones/>}/> 
        <Route path='/phones/:slug' element={<PhoneDetails />} />
        <Route path='/laptops' element={<Laptops/>}/> 
        <Route path='/laptops/:slug' element={<LaptopsDetails />} />
        <Route path='/gaming' element={<Gaming/>}/>
        <Route path='/gaming/:slug' element={<GamingDetails/>}/>
        <Route path='/smartwatches' element={<Smartwatches/>}/>
        <Route path='/smartwatches/:slug' element={<SmartwatchesDetails/>}/>
        <Route path='/tvs' element={<Tv/>}/>
        <Route path='/tvs/:slug' element={<TvDetails/>}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/orders" element={<Orders />} />





      </Routes>
      <Footer/>
  
    </div>
  );
}

export default App;
