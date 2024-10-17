import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated imports for v6
import './styles.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Chairs from './components/Chairs';
import Sofas from './components/Sofas';
import Tables from './components/Tables';
import Beds from './components/Beds';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <div className="mainImage">
                <img className="responsiveImg" src="/img/backgroundmain.jpg" alt="Main Background" />
              </div>
              <ProductList />
            </>
          } 
        />
        <Route path="/chairs" element={<Chairs />} />
        <Route path="/sofas" element={<Sofas />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/beds" element={<Beds />} />
      </Routes>
      <div className="footer">
        <p>©Copyright Elysian Furnishings 2024</p>
        <p>Email: Elysian@email.com</p>
        <p>Phone: 1-423-476-3157</p>
      </div>
    </Router>
  );
}

export default App;
