import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Chairs from './components/Chairs';
import Sofas from './components/Sofas';
import Tables from './components/Tables';
import Beds from './components/Beds';
import Footer from './components/Footer';
import Account from './components/Account';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import Wishlist from './components/Wishlist'; // Import Wishlist component
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext'; // Import WishlistProvider
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider
import Checkout from './components/Checkout';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <WishlistProvider>
                    <ThemeProvider> {/* Wrap your app in ThemeProvider */}
                        <Router>
                            <div className="app-container">
                                <Navbar />
                                <Routes>
                                    <Route path="/" element={<ProductList />} />
                                    <Route path="/chairs" element={<Chairs />} />
                                    <Route path="/sofas" element={<Sofas />} />
                                    <Route path="/tables" element={<Tables />} />
                                    <Route path="/beds" element={<Beds />} />
                                    <Route path="/account" element={<Account />} />
                                    <Route path="/cart" element={<Cart />} />
                                    <Route path="/wishlist" element={<Wishlist />} />
                                    <Route path="/product/:id" element={<ProductDetail />} />
                                    <Route path="/checkout" element={<Checkout />} />
                                </Routes>
                            </div>
                            <Footer />
                        </Router>
                    </ThemeProvider>
                </WishlistProvider>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
