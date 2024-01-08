'use client'

import React, { useState, useEffect } from 'react';
import 'app/globals.css';
import ChangePopup from './changepopup.jsx';
import BackPopup from './backpopup.jsx';
import MenuBar from './menubar.jsx';
import ChangeFrame from './changeframe.jsx';

export default function Items() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isChangePopupOpen, setIsChangePopupOpen] = useState(false);
  const [isBackPopupOpen, setIsBackPopupOpen] = useState(false);

  useEffect(() => {
    // Function to check the screen width and set the state
    function checkScreenWidth() {
      setIsSmallScreen(window.innerWidth < 1232);
    }

    // Add an event listener for screen width changes
    window.addEventListener('resize', checkScreenWidth);

    // Call the function initially
    checkScreenWidth();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);
  //ChangePopup
  const openChangePopup = () => {
    setIsChangePopupOpen(true);
  };

  const closeChangePopup = () => {
    setIsChangePopupOpen(false);
  };

  const handleChangeAction = () => {
    openChangePopup();
  };
  //BackPopup
  const openBackPopup = () => {
    setIsBackPopupOpen(true);
  };

  const closeBackPopup = () => {
    setIsBackPopupOpen(false);
  };

  const handleBackAction = () => {
    openBackPopup();
  };

  return (
    <div className="font-Manrope">
      {isSmallScreen ? (
        <div className="bg-black text-white h-screen flex flex-col items-center justify-center">
          <span role="img" aria-label="Pray" className="text-6xl p-5">🙏</span>
          <p className="text-center px-10 text-[20px]">Sorry, your device is not supported. Please use a tablet or a computer, or change the text size in your web browser.</p>
        </div>
      ) : (
        <>
          <div className="gradient-background">
            <MenuBar />
            <div className="flex items-center justify-center h-[calc(100vh-67px)]">
              <ChangeFrame
                handleChangeAction={handleChangeAction}
                handleBackAction={handleBackAction}
              />
            </div>
          </div>
          {/* Display the popup if isPopupOpen is true */}
          {isChangePopupOpen && <ChangePopup onClose={closeChangePopup} />}
          {isBackPopupOpen && <BackPopup onClose={closeBackPopup} />}
        </>
      )}
    </div>
  );
}
