import React from 'react';
import bedsData from './bedsData';
import '../styles.css';

function Beds() {
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
          {bedsData.map((bed) => (
            <div key={bed.id} className="product">
              <img src={bed.image} alt={bed.name} />
              <p className="productName">{bed.name}</p>
              <p>{bed.make}</p>
              <p>${bed.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Beds;
