import React from 'react';
import './Navbar.css';
import search from '../assets/search.png';
import cart from '../assets/cart.png';
import profile from '../assets/profile.png';

const NotificationIcon = () => {
  return (
    <div className="icon-container">
      <img src={cart} alt="Cart Icon" width="30" height="30" />
    </div>
  );
};

const SearchField = () => {
  const [searchText, setSearchText] = React.useState('');

  return (
    <div className="search-container">
      <input 
        type="text" 
        placeholder="Tìm kiếm..." 
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="search-input"
      />
      <button className="search-button">
        <img src={search} alt="Search Icon" className="search-icon" />
      </button>
    </div>
  );
};

const Header = () => {
  return (
    <div className="main-header">
      <div className="header-center">
        <SearchField />
      </div>
      <div className="header-right">
        <NotificationIcon />
        <img src={profile} alt="Profile Icon" className="profile-icon" />
      </div>
    </div>
  );
};

export default Header;
