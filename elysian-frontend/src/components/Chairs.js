import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ky from 'ky';

function Chairs() {
    const [chairs, setChairs] = useState([]);
    const [vendorChairs, setVendorChairs] = useState([]);

    useEffect(() => {
        ky.get('http://localhost:5000/api/products', { searchParams: { category: 'chair' } })
            .json()
            .then(setChairs)
            .catch((error) => console.error('Error fetching chairs:', error));

        ky.get('http://localhost:5000/api/vendor-products', { searchParams: { category: 'chair' } })
            .json()
            .then(setVendorChairs)
            .catch((error) => console.error('Error fetching vendor chairs:', error));
    }, []);

    return (
        <div>
            {/* Banner Image */}
            {/* Background via Freepik https://www.freepik.com/free-photo/view-room-interior-with-furniture-copy-space_58556710.htm#fromView=search&page=5&position=32&uuid=6c49763b-be93-4d0f-a315-58988d1d0505 -Sean Tiner */}
            <div class="mainImage">
                <img class="responsiveImg" src="img/chairImg/bannerChair8.jpg"/>
            </div>

            <div className="MainPageContent">
                <h1 className="productHeader">Chairs Collection</h1>
                <p className="productHeaderDescription">Check out our amazing collection of chairs. Find the perfect chair to complement your room style and comfort needs.</p>
                <div className="product-list">
                    {chairs.map((chair) => (
                        <div key={chair.id} className="product">
                            <Link to={`/product/${chair.id}`}>
                                <div className="product-image-container">
                                    <img 
                                        src={chair.image_path ? `http://localhost:5000/${chair.image_path}` : chair.image}
                                        alt={chair.name}
                                        className="product-image"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/placeholder-image.jpg';
                                        }}
                                    />
                                </div>
                            </Link>
                            <p className="productName">{chair.name}</p>
                            <p>Brand: {chair.make}</p>
                            <p>Price: ${parseFloat(chair.price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                            <p>{chair.description}</p>
                        </div>
                    ))}
                    {vendorChairs.map((vendorChair) => (
                        <div key={vendorChair.id} className="product">
                            <Link to={`/vendor-product/${vendorChair.id}`}>
                                <div className="product-image-container">
                                    <img 
                                        src={`http://localhost:5000/${vendorChair.image_path}`}
                                        alt={vendorChair.name}
                                        className="product-image"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/placeholder-image.jpg';
                                        }}
                                    />
                                </div>
                            </Link>
                            <p className="productName">{vendorChair.name}</p>
                            <p>Brand: {vendorChair.make}</p>
                            <p>Price: ${parseFloat(vendorChair.price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                            <p>{vendorChair.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Chairs;
