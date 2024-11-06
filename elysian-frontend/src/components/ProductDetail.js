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
                <h2>{product.name}</h2>
                <p>Brand: {product.make}</p>
                <p>Price: ${product.price}</p>
                <p>{product.description}</p>
                <button onClick={handleAddToCart}>Add to Cart</button>
                <button onClick={handleAddToWishlist}>
                    <img src="/img/Wishlist2.png" alt="Add to Wishlist" />
                </button>
            </div>
        </div>
    );
}

export default ProductDetail;
