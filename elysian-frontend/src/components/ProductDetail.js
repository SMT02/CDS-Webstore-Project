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
    const [showMessage, setShowMessage] = useState(false);
    const [rating, setRating] = useState(0); // User's rating
    const [hoverRating, setHoverRating] = useState(0); // Rating on hover
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState([]);

    // Fetch product details
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

    // Fetch reviews for this product
    useEffect(() => {
        ky.get(`http://localhost:5000/reviews/${id}`)
            .json()
            .then((data) => setReviews(data))
            .catch((error) => console.error('Error fetching reviews:', error));
    }, [id]);

    // Handler for submitting a review
    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (rating === 0 || comment === '') return;

        const newReview = {
            rating,
            comment,
        };

        // POST request to submit the review
        ky.post(`http://localhost:5000/reviews/${id}`, {
            json: newReview,
        })
            .json()
            .then((response) => {
                setReviews([...reviews, { ...newReview, date: new Date().toLocaleDateString() }]);
                setRating(0);
                setComment('');
            })
            .catch((error) => {
                console.error('Error submitting review:', error);
            });
    };

    // Function to render the star rating system
    const renderStars = () => {
        return (
            <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={star <= (hoverRating || rating) ? 'star filled' : 'star'}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                    >
                        ★
                    </span>
                ))}
            </div>
        );
    };

    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    const handleAddToCart = () => {
        addToCart(product);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000);
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

                {showMessage && (
                    <div className="added-to-cart-message">
                        <p>Item added to cart!</p>
                    </div>
                )}

                {/* Review Form - Star Rating & Comments */}
                <div className="review-form">
                    <h3>Leave a Review</h3>
                    {renderStars()}
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your comment here"
                        className="review-comment-input"
                    />
                    <button onClick={handleReviewSubmit} className="submit-review-btn">Submit Review</button>
                </div>

                {/* Customer Reviews Section */}
                <div className="reviews-section">
                    <h3>Customer Reviews</h3>
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="review">
                                <div className="review-rating">
                                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                </div>
                                <p className="review-comment">{review.comment}</p>
                                <p className="review-date">{review.date}</p>
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet. Be the first to review!</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
