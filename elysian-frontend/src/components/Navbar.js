import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css'; // Ensure you are importing the CSS correctly

function Navbar() {
  const [isResponsive, setIsResponsive] = useState(false);

  const toggleMenu = () => {
    setIsResponsive(!isResponsive);
  };

  return (
    <div className={`topnav ${isResponsive ? 'responsive' : ''}`} id="TopNav">
      <div className="topnavCentered">
        <Link to="/" className="homeButton">
          <img src="/img/Logo.jpg" width="70px" alt="Home Logo" />
        </Link>
      </div>

      {/* Traditional navigation links */}
      <Link to="/chairs" className="textButton">Chairs</Link>
      <Link to="/sofas" className="textButton">Sofas</Link>
      <Link to="/tables" className="textButton">Tables</Link>
      <Link to="/beds" className="textButton">Beds</Link>
      <Link to="/login" className="textButton">Login / Sign Up</Link>

      {/* Icons */}
      <a href="#light-mode" id="light" className="icon">
        <img src="/img/Light3.png" width="27px" alt="Light Mode" />
      </a>
      <a href="#dark-mode" id="dark" className="icon">
        <img src="/img/Dark2.png" width="27px" alt="Dark Mode" />
      </a>
      <Link to="/wishlist" id="wish" className="icon">
        <img src="/img/Wishlist2.png" width="27px" alt="Wishlist" />
      </Link>
      <Link to="/cart" id="cart" className="icon">
        <img src="/img/Cart2.png" width="27px" alt="Cart" />
      </Link>

      {/* Hamburger Menu for smaller screens - Changed to button for accessibility */}
      <button className="subMenu" onClick={toggleMenu} aria-label="Toggle Menu">
        <img
          id="menuIcon"
          src={`/img/${isResponsive ? 'CloseIcon.png' : 'Hamburger%20Menu%20Icon2.png'}`}
          width="24px"
          alt="Menu"
        />
      </button>

      {/* Search bar */}
      <div className="search">
        <form action="#">
          <input className="searchBar" type="text" placeholder="Search For Product" name="search" />
          <button className="searchButton">
            <img src="/img/SearchIcon2.png" width="30px" alt="Search" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Navbar;
