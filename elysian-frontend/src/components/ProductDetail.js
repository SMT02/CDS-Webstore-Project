import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ky from 'ky';
import './ProductDetails.css';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

function ProductDetail() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { addToWishlist } = useWishlist();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [showMessage, setShowMessage] = useState(false);  // State to control the popup message visibility


    useEffect(() => {
        ky.get(`http://localhost:5000/api/products/${id}`)
            .json()
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching product:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    const handleAddToCart = () => {
        addToCart(product);
        setShowMessage(true); // Show the popup message
        setTimeout(() => setShowMessage(false), 2000); // Hide the message after 2 seconds
    };

    const handleAddToWishlist = () => {
        addToWishlist(product);
    };

    return (
        <div className="product-detail">
            <div className="product-detail-image-container">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="product-detail-image"
                />
            </div>
                <div className="product-info">
                    <h2 className="product-name">{product.name}</h2>
                    <p className="product-brand">Brand: {product.make}</p>
                <div className="product-meta">
                    <p className="product-price">${parseFloat(product.price || 0).toFixed(2)}</p>
                </div>

                <div className="product-actions">
                    <label className="quantity-label">
                        Quantity:
                        <select
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                            className="quantity-select"
                        >
                            {[...Array(10).keys()].map((num) => (
                                <option key={num + 1} value={num + 1}>
                                    {num + 1}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
                    <button onClick={handleAddToWishlist} className="add-to-wishlist-btn">
                        <img src="/img/Wishlist2.png" alt="Add to Wishlist" />
                    </button>
                </div>
                {/* Popup message when an item is added to the cart */}
            {showMessage && (
                <div className="added-to-cart-message">
                    <p>Item added to cart!</p>
                </div>
            )}
            </div>
        </div>
    );
}

export default ProductDetail;


