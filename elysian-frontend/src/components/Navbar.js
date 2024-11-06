import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../styles.css';

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
      <NavLink to="/chairs" className="textButton">Chairs</NavLink>
      <NavLink to="/sofas" className="textButton">Sofas</NavLink>
      <NavLink to="/tables" className="textButton">Tables</NavLink>
      <NavLink to="/beds" className="textButton">Beds</NavLink>
      {/* Icons on the right side */}
      <div className="icon-container">
        <Link to="/account" className="icon" id="account">
          <img src="/img/AccountIcon.png" width="24x" alt="Account" />
        </Link>
        <Link to="/cart" id="cart" className={`icon ${isResponsive ? 'responsive-padding' : ''}`}>
          <img src="/img/Cart2.png" width="27px" alt="Cart" />
        </Link>
      </div>
        <Link to="/wishlist" className="icon" id="wishlist">
          <img src="/img/WishList2.png" width="27px" alt="Wishlist" />
        </Link>
      {/* Icons for light/dark mode */}
      <a href="#light-mode" id="light" className="icon">
        <img src="/img/Light3.png" width="27px" alt="Light Mode" />
      </a>
      <a href="#dark-mode" id="dark" className={`icon ${isResponsive ? 'responsive-padding' : ''}`}>
        <img src="/img/Dark2.png" width="27px" alt="Dark Mode" />
      </a>

      {/* Hamburger Menu for smaller screens */}
      <button className="subMenu" onClick={toggleMenu} aria-label="Toggle Menu" type="button">
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
          <button className="searchButton" type="submit">
            <img src="/img/SearchIcon2.png" width="30px" alt="Search" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Navbar;
