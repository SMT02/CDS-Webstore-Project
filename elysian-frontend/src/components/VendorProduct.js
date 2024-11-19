import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ky from 'ky';

function VendorProduct() {
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        ky.get(`http://localhost:5000/api/vendor-products/${id}`)
            .json()
            .then(setProduct)
            .catch(err => {
                console.error('Error fetching vendor product:', err);
                setError('Failed to load product');
            });
    }, [id]);

    if (error) return <div className="error">{error}</div>;
    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-detail">
            <div className="product-image-container">
                <img
                    src={product.image_path ? `http://localhost:5000/${product.image_path}` : '/placeholder-image.jpg'}
                    alt={product.name}
                    className="product-image"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder-image.jpg';
                    }}
                />
            </div>
            <div className="product-info">
                <h1>{product.name}</h1>
                <p className="price">Price: ${parseFloat(product.price).toFixed(2)}</p>
                <p className="brand">Brand: {product.make}</p>
                <p className="description">{product.description}</p>
                <p className="vendor">Sold by: {product.vendor_name}</p>
                {/* Add cart button here if needed */}
            </div>
        </div>
    );
}

export default VendorProduct;