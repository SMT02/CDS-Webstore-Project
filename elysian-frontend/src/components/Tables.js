import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ky from 'ky';

function Tables() {
    const [tables, setTables] = useState([]);
    const [vendorTables, setVendorTables] = useState([]);

    useEffect(() => {
        ky.get('http://localhost:5000/api/products', { searchParams: { category: 'table' } })
            .json()
            .then(setTables)
            .catch((error) => console.error('Error fetching tables:', error));

        ky.get('http://localhost:5000/api/vendor-products', { searchParams: { category: 'table' } })
            .json()
            .then(setVendorTables)
            .catch((error) => console.error('Error fetching vendor tables:', error));
    }, []);

    return (
        <div className="MainPageContent">
            <div className="product-list">
                {tables.map((table) => (
                    <div key={table.id} className="product">
                        <Link to={`/product/${table.id}`}>
                            <img src={table.image} alt={table.name} />
                        </Link>
                        <p className="productName">{table.name}</p>
                        <p>Brand: {table.make}</p>
                        <p>Price: ${table.price}</p>
                    </div>
                ))}
                {vendorTables.map((vendorTable) => (
                    <div key={vendorTable.id} className="product">
                        <Link to={`/vendor-product/${vendorTable.id}`}>
                            <img src={vendorTable.image_path} alt={vendorTable.name} />
                        </Link>
                        <p className="productName">{vendorTable.name}</p>
                        <p>Brand: {vendorTable.make}</p>
                        <p>Price: ${vendorTable.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tables;
