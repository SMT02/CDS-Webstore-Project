import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ky from 'ky';

function Sofas() {
    const [sofas, setSofas] = useState([]);

    useEffect(() => {
        ky.get('http://localhost:5000/api/products', { searchParams: { category: 'sofa' } })
            .json()
            .then(setSofas)
            .catch((error) => console.error('Error fetching sofas:', error));
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
        </div>
        </div>
    );
}

export default Sofas;
