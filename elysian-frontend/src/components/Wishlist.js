// src/components/Wishlist.js
import React from 'react';
import { useWishlist } from '../context/WishlistContext';

function Wishlist() {
    const { wishlist, removeFromWishlist } = useWishlist();

    if (wishlist.length === 0) {
        return <div className="wishlist-empty">Your wishlist is empty.</div>;
    }

    return (
        <div className="wishlist-container">
            <h2>Your Wishlist</h2>
            <ul className="wishlist-list">
                {wishlist.map((item) => (
                    <li key={item.id} className="wishlist-item">
                        <img src={item.image} alt={item.name} className="wishlist-item-image" />
                        <div className="wishlist-item-details">
                            <h3 className="wishlist-item-name">{item.name}</h3>
                            <p className="wishlist-item-brand">Brand: {item.brand}</p>
                            <button 
                                onClick={() => removeFromWishlist(item.id)} 
                                className="remove-button"
                            >
                                Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Wishlist;
