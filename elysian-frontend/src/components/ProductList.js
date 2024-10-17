import React from 'react';
import '../styles.css';

function ProductList() {
  const products = [
    { name: 'Chair', image: 'chairmain.jfif', link: '/chairs' },
    { name: 'Bed', image: 'bedmain.jfif', link: '/beds' },
    { name: 'Sofa', image: 'sofamain.jfif', link: '/sofas' },
    { name: 'Table', image: 'tablemain.jfif', link: '/tables' },
  ];

  return (
    <div className="MainPageContent">
      <div className="product-list">
        {products.map((product, index) => (
          <div className="product" key={index}>
            <a href={product.link}>
              <img src={`/img/${product.image}`} alt={product.name} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
