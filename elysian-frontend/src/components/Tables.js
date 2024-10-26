import React from 'react';
import tablesData from './tablesData';
import '../styles.css';

function Tables() {
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
          {tablesData.map((table) => (
            <div key={table.id} className="product">
              <img src={table.image} alt={table.name} />
              <p className="productName">{table.name}</p>
              <p>{table.make}</p>
              <p>${table.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
              {/* table.price.toFixed(2) */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tables;
