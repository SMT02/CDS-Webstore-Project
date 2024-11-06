import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ky from 'ky';

function Chairs() {
    const [chairs, setChairs] = useState([]);

    useEffect(() => {
        ky.get('http://localhost:5000/api/products', { searchParams: { category: 'chair' } })
            .json()
            .then(setChairs)
            .catch((error) => console.error('Error fetching chairs:', error));
    }, []);

    return (
        <div className="product-list">
            {chairs.map((chair) => (
                <div key={chair.id} className="product">
                    <Link to={`/product/${chair.id}`}>
                        <img src={chair.image} alt={chair.name} />
                    </Link>
                    <p className ="productName">{chair.name}</p>
                    <p>Brand: {chair.make}</p>
                    <p>Price: ${chair.price}</p>
                </div>
            ))}
        </div>
    );
}

export default Chairs;
