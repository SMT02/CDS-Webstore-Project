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
        <div>
            {/* Banner Image */}
            {/* Background via Freepik https://www.freepik.com/free-photo/modern-beige-fabric-couch-plant-living-room_18415941.htm#fromView=search&page=1&position=0&uuid=c120b202-4b6f-4135-9b5c-0da184371d0e -Sean Tiner */}
            <div class="mainImage">
                <img class="responsiveImg" src="img/sofaImg/bannerSofa8.jpg"/>
            </div>

            <div className="MainPageContent">
                <h1 className="productHeader">Sofas Collection</h1>
                <p className="productHeaderDescription">Welcome to the sofas collection. Here you can explore a wide variety of sofas for your perfect home decor.</p>
                <div className="product-list">
                    {sofas.map((sofa) => (
                        <div key={sofa.id} className="product">
                            <Link to={`/product/${sofa.id}`}>
                                <div className="product-image-container">
                                    <img 
                                        src={sofa.image_path ? `http://localhost:5000/${sofa.image_path}` : sofa.image}
                                        alt={sofa.name}
                                        className="product-image"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/placeholder-image.jpg';
                                        }}
                                    />
                                </div>
                            </Link>
                            <p className="productName">{sofa.name}</p>
                            <p>Brand: {sofa.make}</p>
                            <p>Price: ${parseFloat(sofa.price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                            <p>{sofa.description}</p>
                        </div>
                    ))}
                    {vendorSofas.map((vendorSofa) => (
                        <div key={vendorSofa.id} className="product">
                            <Link to={`/vendor-product/${vendorSofa.id}`}>
                                <div className="product-image-container">
                                    <img 
                                        src={`http://localhost:5000/${vendorSofa.image_path}`}
                                        alt={vendorSofa.name}
                                        className="product-image"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/placeholder-image.jpg';
                                        }}
                                    />
                                </div>
                            </Link>
                            <p className="productName">{vendorSofa.name}</p>
                            <p>Brand: {vendorSofa.make}</p>
                            <p>Price: ${parseFloat(vendorSofa.price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                            <p>{vendorSofa.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Sofas;
