import React from 'react';
import sofasData from './sofasData';
import '../styles.css';

function Sofas() {
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
          {sofasData.map((sofa) => (
            <div key={sofa.id} className="product">
              <img src={sofa.image} alt={sofa.name} />
              <p className="productName">{sofa.name}</p>
              <p>{sofa.make}</p>
              <p>${sofa.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sofas;
