import React from 'react';
import { bindetaildata } from '../data/bindetaildata';
import './style.css'
import Image from 'next/image'


export const SearchBar = ({ onLocationClick, searchResults }) => {
  if (!searchResults || searchResults.length === 0) {
    return null; // Render nothing if there are no search results
  }

  const binData = searchResults
  console.log('binData:', binData)

  const handleLocationClick = (location) => {
    console.log('locationnn:', location)
    onLocationClick(location);
  };

  return (
    <div className="bg-f4f4f4 rounded-xl font-NotoSansThai">
      <div className="p-2 mt-1">
        {searchResults.map((binData) => (
          <div
            key={binData.id}
            className="searchitem bg-ffffff mt-2 rounded-xl shadow-xl relative hover:scale-95 transition cursor-pointer"
            onClick={() => handleLocationClick({lat: binData.lat, lng: binData.lng})}
          >
            {/* Bin Data Section */}
            <div className="w-full h-full">
              {/* Display bin data in the innermost div */}
              <div className="p-2">
                <div className="flex justify-start items-center">
                  <p className="text-xl font-semibold pl-2">{binData.location}</p>
                </div>
                <p className="bin-location mt-2 ml-5 mr-5 text-lg text-717171">{binData.description}</p>
              </div>

              {/* Bin Type Icons */}
              <div className="flex justify-end items-center p-4">
                {Object.keys(binData)
                  .filter((binType) => binData[binType] === 1)
                  .map((activeBinType) => (
                    <Image
                      key={activeBinType}
                      src={`/static/${activeBinType}.png`} // Replace with the actual path
                      alt={`${activeBinType} icon`}
                      className="mr-2"
                      width = '25'
                      height = '25'
                    />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};