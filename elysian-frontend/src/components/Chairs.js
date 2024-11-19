import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ky from 'ky';

function Chairs() {
    const [chairs, setChairs] = useState([]);
    const [vendorChairs, setVendorChairs] = useState([]);

    useEffect(() => {
        ky.get('http://localhost:5000/api/products', { searchParams: { category: 'chair' } })
            .json()
            .then(setChairs)
            .catch((error) => console.error('Error fetching chairs:', error));

        ky.get('http://localhost:5000/api/vendor-products', { searchParams: { category: 'chair' } })
            .json()
            .then(setVendorChairs)
            .catch((error) => console.error('Error fetching vendor chairs:', error));
    }, []);

    return (
        <div className="MainPageContent">
            <div className="product-list">
                {chairs.map((chair) => (
                    <div key={chair.id} className="product">
                        <Link to={`/product/${chair.id}`}>
                            <img src={chair.image} alt={chair.name} />
                        </Link>
                        <p className="productName">{chair.name}</p>
                        <p>Brand: {chair.make}</p>
                        <p>Price: ${chair.price}</p>
                    </div>
                ))}
                {vendorChairs.map((vendorChair) => (
                    <div key={vendorChair.id} className="product">
                        <Link to={`/vendor-product/${vendorChair.id}`}>
                            <img src={vendorChair.image_path} alt={vendorChair.name} />
                        </Link>
                        <p className="productName">{vendorChair.name}</p>
                        <p>Brand: {vendorChair.make}</p>
                        <p>Price: ${vendorChair.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Chairs;
