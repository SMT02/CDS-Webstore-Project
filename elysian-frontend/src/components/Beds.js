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
        <div>
            {/* Banner Image */}
            {/* Background via Freepik https://www.freepik.com/free-photo/peaceful-bedroom-with-beige-colors-simple-design_135010423.htm#fromView=search&page=3&position=8&uuid=06cf7b4f-3055-4897-8821-006eff7deb55 -Sean Tiner */} 
            <div class="mainImage">
                <img class="responsiveImg" src="img/bedImg/bannerBed9.jpg"/>
            </div>

            <div className="MainPageContent">
                <h1 className="productHeader">Beds Collection</h1>
                <p className="productHeaderDescription">Discover our cozy bed collection. Find the best options for your comfort and a perfect night's sleep.</p>
                <div className="product-list">
                    {beds.map((bed) => (
                        <div key={bed.id} className="product">
                            <Link to={`/product/${bed.id}`}>
                                <div className="product-image-container">
                                    <img 
                                        src={bed.image_path ? `http://localhost:5000/${bed.image_path}` : bed.image}
                                        alt={bed.name}
                                        className="product-image"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/placeholder-image.jpg';
                                        }}
                                    />
                                </div>
                            </Link>
                            <p className="productName">{bed.name}</p>
                            <p>Brand: {bed.make}</p>
                            <p>Price: ${parseFloat(bed.price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                            <p>{bed.description}</p>
                        </div>
                    ))}
                    {vendorBeds.map((vendorBed) => (
                        <div key={vendorBed.id} className="product">
                            <Link to={`/vendor-product/${vendorBed.id}`}>
                                <div className="product-image-container">
                                    <img 
                                        src={`http://localhost:5000/${vendorBed.image_path}`}
                                        alt={vendorBed.name}
                                        className="product-image"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/placeholder-image.jpg';
                                        }}
                                    />
                                </div>
                            </Link>
                            <p className="productName">{vendorBed.name}</p>
                            <p>Brand: {vendorBed.make}</p>
                            <p>Price: ${parseFloat(vendorBed.price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                            <p>{vendorBed.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Beds;
