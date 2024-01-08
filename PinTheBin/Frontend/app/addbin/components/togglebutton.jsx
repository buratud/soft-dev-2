'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export const ToggleButtons = ({ onButtonStateChange, initialButtonStates }) => {
  const router = useRouter()
  const buttonColors = {
    blue_bin: 'bg-0021f5',
    yellow_bin: 'bg-ffc82f',
    green_bin: 'bg-00ab15',
    red_bin: 'bg-dd3327',
  };

  // Define buttonStates using useState
  const [buttonStates, setButtonStates] = useState({
    blue_bin: {
        active: false,
        icon: '/static/blue_bin.png',
        activeIcon: '/static/blue_bin_white.png',
        title: 'ขยะทั่วไป'
      },
      yellow_bin: {
        active: false,
        icon: '/static/yellow_bin.png',
        activeIcon: '/static/yellow_bin_white.png',
        title: 'ขยะรีไซเคิล'
      },
      green_bin: {
        active: false,
        icon: '/static/green_bin.png',
        activeIcon: '/static/green_bin_white.png',
        title: 'ขยะเปียก'
      },
      red_bin: {
        active: false,
        icon: '/static/red_bin.png',
        activeIcon: '/static/red_bin_white.png',
        title: 'ขยะอันตราย'
      },
  });

  const setInitialButtonStates = (initialStates) => {
    if (initialStates && typeof initialStates === 'object') {
      setButtonStates((prevState) => {
        const newState = { ...prevState };
  
        Object.keys(newState).forEach((binType) => {
          newState[binType].active = initialStates[binType] || false;
        });
  
        return newState;
      });
    }
  };
  

  useEffect(() => {
    setInitialButtonStates(initialButtonStates);
  }, [initialButtonStates]);

  // Function to handle button toggle
  const handleButtonClick = (buttonName) => {
    setButtonStates((prevState) => ({
      ...prevState,
      [buttonName]: {
        ...prevState[buttonName],
        active: !prevState[buttonName].active,
      },
    }));
  };

  useEffect(() => {
    onButtonStateChange(buttonStates);
  }, [buttonStates, onButtonStateChange]);

  // if (localStorage.getItem('token') == null){
  //   router.push('/')
  // }

  return (
    <div className="grid grid-cols-2 gap-4">
      {Object.entries(buttonStates).map(([buttonName, buttonState]) => (
        <button
          key={buttonName}
          onClick={() => handleButtonClick(buttonName)}
          className={`relative rounded-lg p-2 border border-c9c9c9 flex flex-col items-center justify-center hover:scale-105 transition ${
            buttonState.active ? `${buttonColors[buttonName]} text-ffffff` : 'bg-ffffff text-black'
          }`}
        >
          {buttonState.active && (
            <Image
              src="/static/Checkmark.png"
              alt={`${buttonName}-extra`}
              width="96"
              height="96"
              className="absolute top-0 right-0 w-6 h-6"
            />
          )}
          <Image
            src={buttonState.active ? buttonState.activeIcon : buttonState.icon}
            alt={buttonName}
            width="100"
            height="100"
            className="w-12 h-12 mb-2"
          />
          {buttonState.title}
        </button>
      ))}
    </div>
  );
};