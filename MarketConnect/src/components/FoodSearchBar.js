import React, { useState } from 'react';
import './FoodSearchBar.scoped.css';

const FoodSearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="food-search-bar">
      <input type="text" placeholder="Search for food..." value={searchTerm} onChange={handleInputChange}/>
    </div>
  );
};

export default FoodSearchBar;
