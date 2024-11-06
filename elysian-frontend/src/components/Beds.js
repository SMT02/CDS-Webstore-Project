import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ky from 'ky';

function Beds() {
    const [beds, setBeds] = useState([]);

    useEffect(() => {
        ky.get('http://localhost:5000/api/products', { searchParams: { category: 'bed' } })
            .json()
            .then(setBeds)
            .catch((error) => console.error('Error fetching beds:', error));
    }, []);

    return (
        <div className="product-list">
            {beds.map((bed) => (
                <div key={bed.id} className="product">
                    <Link to={`/product/${bed.id}`}>
                        <img src={bed.image} alt={bed.name} />
                    </Link>
                        <p className ="productName">{bed.name}</p>
                        <p>Brand: {bed.make}</p>
                        <p>Price: ${bed.price}</p>
                </div>
            ))}
        </div>
    );
}

export default Beds;
