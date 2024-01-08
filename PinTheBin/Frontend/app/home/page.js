'use client'

import React, { useState, useEffect } from 'react';
import { useJsApiLoader } from "@react-google-maps/api";
import { Sidebar } from "./components/sidebar";
import { Topbar } from './components/topbar';
import { BinDetail } from './components/bindetail';
import { AddBinBtn } from './components/addbinbtn';
import { SetCenterBtn } from './components/setcenterbtn';
import { Map } from './components/map';
import { markerdata as markers } from "./data/markerdata";
import { SearchBar } from './components/searchbar';
import "./components/style.css";


export default function Home() {
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [selectedBinData, setSelectedBinData] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_googleMapsApiKey
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [isBinDetailVisible, setIsBinDetailVisible] = useState(false);

  const toggleBinDetail = (markerId) => {
    console.log(markerId);
    setIsBinDetailVisible(!isBinDetailVisible);
    // console.log('Toggle Bin Detail')
    setSelectedMarkerId(markerId);
    const selectedBin = markers.find((marker) => marker.id === markerId);
    setSelectedBinData(selectedBin);
    
  };

  const closeBinDetail = () => {
    setIsBinDetailVisible(false);
  }

  // Set current location in state
  const defaultCenter = { // Default center coordinates
    lat: 13.8216908,
    lng: 100.5138407
  };
  
  const [currentLocation, setCurrentLocation] = useState(defaultCenter); // Initialize with default center
  
  const setcurrentLocation = (location) => {
    setCurrentLocation(prevLocation => {
      // Use the previous state to ensure that the state is always up-to-date
      const newLocation = location || defaultCenter; // Use defaultCenter if location is not provided
      console.log(newLocation);
      return newLocation;
    });
  };
  

  useEffect(() => {
    console.log(currentLocation); // This will log the updated currentLocation
  }, [currentLocation]); // This useEffect will run whenever currentLocation changes


  return (
    <div>
      <div className="map-container">
        {isLoaded && <Map center={currentLocation} onMarkerClick={toggleBinDetail} />}

      </div>
      
      <div className={`sidebar-dim ${isSidebarOpen ? "open" : ""}`} onClick={toggleSidebar}></div>
      

      <div className={`home-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        {isSidebarOpen && <Sidebar isSidebarOpen={isSidebarOpen} />}
      </div>

      {selectedMarkerId !== null && (
        <div className="home-bindetail open w-full">
          <BinDetail onClose={() => setSelectedMarkerId(null)} markerId={selectedMarkerId} setIsBinDetailVisible={setIsBinDetailVisible} />
        </div>
      )}

      <div className="home-addbinbtn absolute bottom-5 right-5">
        <div className="flex flex-col">
          <div className='pb-5'>
            <SetCenterBtn onGetCurrentLocation={setcurrentLocation} />
          </div>
          <a href="/addbin">
            <AddBinBtn/>
          </a>
        </div>
      </div>

      <div
        className={`sidebar-dim ${isBinDetailVisible ? 'open' : ''}`}
        onClick={() => { setSelectedMarkerId(null); setIsBinDetailVisible(false); }}>
          
      </div>

      <div className="home-topbar sm:w-full md:w-1/3">
        <Topbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onLocationClick={setcurrentLocation}/>
      </div>

      {/* <div className='home-searchbar sm:w-full md:w-1/3'>
        <SearchBar onLocationClick={setcurrentLocation}/>
      </div> */}

    </div>
  );
}