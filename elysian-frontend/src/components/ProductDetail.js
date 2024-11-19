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
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [reviewsLoading, setReviewsLoading] = useState(true);

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

    // Fetch reviews from backend for the specific product
    useEffect(() => {
        setReviewsLoading(true);
        ky.get(`http://localhost:5000/reviews/${id}`, { credentials: 'include' })
            .json()
            .then((data) => {
                setReviews(data);
                calculateAverageRating(data);
                setReviewsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching reviews:', error);
                setReviewsLoading(false);
            });
    }, [id]);

    // Calculate the average rating
    const calculateAverageRating = (reviewsList) => {
        if (reviewsList.length === 0) {
            setAverageRating(0);
            return;
        }
        const avg = reviewsList.reduce((sum, review) => sum + review.rating, 0) / reviewsList.length;
        setAverageRating(avg);
    };

    // Submit review
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0 || comment.trim() === '') return;

        try {
            const response = await ky.post(`http://localhost:5000/reviews/${id}`, {
                json: { rating, comment },
                credentials: 'include',
            });

            const newReview = await response.json();

            // Add the new review to the state
            setReviews([
                ...reviews,
                { ...newReview, rating, comment, date: new Date().toLocaleDateString(), userEmail: newReview.userEmail || 'Anonymous' },
            ]);

            setRating(0);
            setComment('');
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    const renderStars = () => (
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

    if (loading) return <div>Loading product details...</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="product-detail">
            <div className="product-detail-image-container">
                <img src={product.image} alt={product.name} className="product-detail-image" />
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
                    <button onClick={() => addToCart(product)} className="add-to-cart-btn">
                        Add to Cart
                    </button>
                    <button onClick={() => addToWishlist(product)} className="add-to-wishlist-btn">
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
                    <button onClick={handleReviewSubmit} className="submit-review-btn">
                        Submit Review
                    </button>
                </div>

                {/* Customer Reviews Section */}
                <div className="reviews-section">
                    <h3>Customer Reviews</h3>

                    {/* Average Rating */}
                    {averageRating > 0 && (
                        <div className="average-rating">
                            <h4>Average Rating:</h4>
                            <div className="star-rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={star <= Math.round(averageRating) ? 'star filled' : 'star'}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <p>{averageRating.toFixed(1)} / 5</p>
                        </div>
                    )}

                    {/* Show reviews or loading state */}
                    {reviewsLoading ? (
                        <p>Loading reviews...</p>
                    ) : reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="review">
                                <div className="review-rating">
                                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                </div>
                                <p className="review-comment">{review.comment}</p>
                                <p className="review-user">Reviewed by: {review.userEmail || 'Anonymous'}</p>
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
