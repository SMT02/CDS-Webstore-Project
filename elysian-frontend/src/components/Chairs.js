import React from 'react';
import chairsData from './chairsData';
import '../styles.css';

function Chairs() {
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
          {chairsData.map((chair) => (
            <div key={chair.id} className="product">
              <img src={chair.image} alt={chair.name} />
              <p className="productName">{chair.name}</p>
              <p>{chair.make}</p>
              <p>${chair.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Chairs;
