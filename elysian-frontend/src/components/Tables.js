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
        <div>
            {/* Banner Image */}
            {/* Background via Freepik https://www.freepik.com/free-photo/arranged-snack-wooden-table_1441183.htm#fromView=search&page=1&position=27&uuid=121c48a1-cd46-4bb4-98ee-9b7c0a4f2be6 - Sean Tiner */}
            <div className="mainImage">
                <img className="responsiveImg" src="img/tableImg/bannerTable2.jpg" alt="Banner" />
            </div>

            <div className="MainPageContent">
                <h1 className="productHeader">Tables Collection</h1>
                <p className="productHeaderDescription">Explore our diverse range of tables to find the ideal fit for your space and style preferences.</p>
                <div className="product-list">
                    {tables.map((table) => (
                        <div key={table.id} className="product">
                            <Link to={`/product/${table.id}`}>
                                <div className="product-image-container">
                                    <img 
                                        src={table.image_path ? `http://localhost:5000/${table.image_path}` : table.image}
                                        alt={table.name}
                                        className="product-image"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/placeholder-image.jpg';
                                        }}
                                    />
                                </div>
                            </Link>
                            <p className="productName">{table.name}</p>
                            <p>Brand: {table.make}</p>
                            <p>Price: ${parseFloat(table.price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                            <p>{table.description}</p>
                        </div>
                    ))}
                    {vendorTables.map((vendorTable) => (
                        <div key={vendorTable.id} className="product">
                            <Link to={`/vendor-product/${vendorTable.id}`}>
                                <div className="product-image-container">
                                    <img 
                                        src={`http://localhost:5000/${vendorTable.image_path}`}
                                        alt={vendorTable.name}
                                        className="product-image"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/placeholder-image.jpg';
                                        }}
                                    />
                                </div>
                            </Link>
                            <p className="productName">{vendorTable.name}</p>
                            <p>Brand: {vendorTable.make}</p>
                            <p>Price: ${parseFloat(vendorTable.price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                            <p>{vendorTable.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Tables;
