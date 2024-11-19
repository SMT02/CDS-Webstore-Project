import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ky from 'ky';

function Beds() {
    const [beds, setBeds] = useState([]);
    const [vendorBeds, setVendorBeds] = useState([]);

    useEffect(() => {
        ky.get('http://localhost:5000/api/products', { searchParams: { category: 'bed' } })
            .json()
            .then(setBeds)
            .catch((error) => console.error('Error fetching beds:', error));

        ky.get('http://localhost:5000/api/vendor-products', { searchParams: { category: 'bed' } })
            .json()
            .then(setVendorBeds)
            .catch((error) => console.error('Error fetching vendor beds:', error));
    }, []);

    return (
        <div className="MainPageContent">
            <div className="product-list">
                {beds.map((bed) => (
                    <div key={bed.id} className="product">
                        <Link to={`/product/${bed.id}`}>
                            <img src={bed.image} alt={bed.name} />
                        </Link>
                        <p className="productName">{bed.name}</p>
                        <p>Brand: {bed.make}</p>
                        <p>Price: ${bed.price}</p>
                    </div>
                ))}
                {vendorBeds.map((vendorBed) => (
                    <div key={vendorBed.id} className="product">
                        <Link to={`/vendor-product/${vendorBed.id}`}>
                            <img src={vendorBed.image_path} alt={vendorBed.name} />
                        </Link>
                        <p className="productName">{vendorBed.name}</p>
                        <p>Brand: {vendorBed.make}</p>
                        <p>Price: ${vendorBed.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Beds;
