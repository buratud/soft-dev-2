import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
import "./style.css";
import { SearchBar } from '../components/searchbar';
import axios from "../../httpAxios";

export const Topbar = ({ isSidebarOpen, toggleSidebar, onLocationClick }) => {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
    setIsSearchBarVisible(inputValue.trim().length > 0);
 
    // Make an API call when the input changes
    axios.post('http://localhost:8080/bin/search', { 
      location: inputValue, 
      description: inputValue 
    },{ headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
    .then(response => {
      console.log('Search results:', response.data.response);
      setSearchResults(response.data.response);
    })
    .catch(error => {
      console.error('Error searching bins:', error);
    });
  };

  const handleLocationClick = (location) => {
    // Call the provided callback
    onLocationClick(location);
    console.log('location:', location)
    setSearchInput('');
    setIsSearchBarVisible(false);
    setSearchResults([]);
  };

  return (
    <div className={`topbar bg-f4f4f4 rounded-bl-xl rounded-br-xl ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <div className="p-2">
        <div className="bg-ffffff rounded-xl px-2 py-2 w-full flex justify-between items-center">
          {/* Menu Button */}
          <button className="hover:scale-105 transition" onClick={toggleSidebar}>
            <MdMenu size={40}/>
          </button>
          {/* Add some space by using | */}
          <div className="divider px-2">|</div>
          {/* Search Bar */}
          <div className="flex flex-grow bg-white items-center">
            <input
              type="text"
              placeholder="ค้นหาถังขยะใกล้เคียง"
              className="font-NotoSansThai outline-none px-2 py-3 rounded-xl w-full"
              onChange={handleInputChange}
              value={searchInput}
            />
          </div>
        </div>
      </div>
      {isSearchBarVisible && (
        <SearchBar
          onLocationClick={handleLocationClick}
          searchResults={searchResults}
        />
      )}
    </div>
  );
};
