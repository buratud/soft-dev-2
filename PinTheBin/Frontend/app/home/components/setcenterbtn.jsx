import React from 'react';
import { MdMyLocation } from 'react-icons/md';
import { getCurrentLocation } from '../utils/getcurrentlocation';

export const SetCenterBtn = ({ onGetCurrentLocation }) => {
  const getLocation = () => {
    getCurrentLocation(
      (userLocation) => {
        onGetCurrentLocation(userLocation);
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  };


  return (
    <div className="flex justify-center">
      <button
        type="button"
        className="bg-ffffff text-white rounded-full p-5 shadow-lg font-NotoSansThai font-medium text-xl hover:scale-105 hover:bg-ebebeb transition-all"
        onClick={getLocation}
      >
        <MdMyLocation className="inline-block w-10 h-10" color='#494949'/>
      </button>
    </div>
  );
};
