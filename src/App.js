import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import './styles/global.css';  
import Product from './components/category_details';
import Productdetails from './components/product_details';

function App() {
  return (
    <Router>  
      <Routes> 
        <Route path="/" element={<HomePage />} /> 
        <Route path="/products" element={<Product />} />
        <Route path="/products/:id" element={<Productdetails />} />

        </Routes>
    </Router>
  );
}

export default App;
