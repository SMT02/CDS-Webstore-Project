import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ky from 'ky';

function Tables() {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        ky.get('http://localhost:5000/api/products', { searchParams: { category: 'table' } })
            .json()
            .then(setTables)
            .catch((error) => console.error('Error fetching tables:', error));
    }, []);

    return (
        <div className="MainPageContent">
        <div className="product-list">
            {tables.map((table) => (
                <div key={table.id} className="product">
                    <Link to={`/product/${table.id}`}>
                        <img src={table.image} alt={table.name} />
                    </Link>
                    <p className ="productName">{table.name}</p>
                    <p>Brand: {table.make}</p>
                    <p>Price: ${table.price}</p>
                </div>
            ))}
        </div>
        </div>
    );
}

export default Tables;
