import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ky from 'ky';

function Sofas() {
    const [sofas, setSofas] = useState([]);
    const [vendorSofas, setVendorSofas] = useState([]);

    useEffect(() => {
        ky.get('http://localhost:5000/api/products', { searchParams: { category: 'sofa' } })
            .json()
            .then(setSofas)
            .catch((error) => console.error('Error fetching sofas:', error));

        ky.get('http://localhost:5000/api/vendor-products', { searchParams: { category: 'sofa' } })
            .json()
            .then(setVendorSofas)
            .catch((error) => console.error('Error fetching vendor sofas:', error));
    }, []);

    return (
        <div className="MainPageContent">
            <div className="product-list">
                {sofas.map((sofa) => (
                    <div key={sofa.id} className="product">
                        <Link to={`/product/${sofa.id}`}>
                            <img src={sofa.image} alt={sofa.name} />
                        </Link>
                        <p className="productName">{sofa.name}</p>
                        <p>Brand: {sofa.make}</p>
                        <p>Price: ${sofa.price}</p>
                    </div>
                ))}
                {vendorSofas.map((vendorSofa) => (
                    <div key={vendorSofa.id} className="product">
                        <Link to={`/vendor-product/${vendorSofa.id}`}>
                            <img src={vendorSofa.image_path} alt={vendorSofa.name} />
                        </Link>
                        <p className="productName">{vendorSofa.name}</p>
                        <p>Brand: {vendorSofa.make}</p>
                        <p>Price: ${vendorSofa.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sofas;
