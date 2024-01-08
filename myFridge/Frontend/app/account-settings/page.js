'use client'

import React, { useState, useEffect } from 'react';
import 'app/globals.css';
import DiscardPopup from './discardpopup.jsx';
import SavePopup from './savepopup.jsx';
import DeletePopup from './deletepopup.jsx';
import LogoutPopup from './logoutpopup.jsx';
import Sidebar from './sidebar.jsx';
import MenuBar from './menubar.jsx';
import AccountSettingsFrame from './accountsettingsframe.jsx';

export default function AccountSettings() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  const [isDiscardPopupOpen, setIsDiscardPopupOpen] = useState(false);
  const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [userId, setUserId] = useState();

  useEffect(() => {
    // Function to check the screen width and set the state
    function checkScreenWidth() {
      setIsSmallScreen(window.innerWidth < 977);
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

  const openDiscardPopup = () => {
    setIsDiscardPopupOpen(true);
  };

  const closeDiscardPopup = () => {
    setIsDiscardPopupOpen(false);
  };

  const openSavePopup = () => {
    setIsSavePopupOpen(true);
  };

  const closeSavePopup = () => {
    setIsSavePopupOpen(false);
  };

  const openDeletePopup = () => {
    setIsDeletePopupOpen(true);
  };

  const closeDeletePopup = () => {
    setIsDeletePopupOpen(false);
  };

  const handleDiscardAction = () => {
    openDiscardPopup();
  };

  const handleSaveAction = () => {
    openSavePopup();
  };

  const handleDeleteAction = (user_id) => {
    setUserId(user_id);
    openDeletePopup();
  };

  const openLogoutPopup = () => {
    setIsLogoutPopupOpen(true);
  };

  const closeLogoutPopup = () => {
    setIsLogoutPopupOpen(false);
  };

  const handleLogoutAction = () => {
    openLogoutPopup();
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
          <MenuBar
              handleLogoutAction={handleLogoutAction}
            />
          <div className="hidden 2xl:flex">
            <div className="w-96 2xl:w-1/4 p-10">
            <Sidebar
              handleLogoutAction={handleLogoutAction}
            />
            </div>
            <div className="w-3/4 pt-10 pb-10 pr-10">
              <AccountSettingsFrame
                handleDiscardAction={handleDiscardAction}
                handleSaveAction={handleSaveAction}
                handleDeleteAction={handleDeleteAction}
              />
            </div>
          </div>
          <div className="flex 2xl:hidden">
            <div className="w-full p-10">
              <AccountSettingsFrame
                handleDiscardAction={handleDiscardAction}
                handleSaveAction={handleSaveAction}
                handleDeleteAction={handleDeleteAction}
              />
            </div>
          </div>
          </div>
          {/* Display the popup if isPopupOpen is true */}
          {isDiscardPopupOpen && <DiscardPopup onClose={closeDiscardPopup} />}
          {isSavePopupOpen && <SavePopup onClose={closeSavePopup} />}
          {isDeletePopupOpen && <DeletePopup userId={userId} onClose={closeDeletePopup} />}
          {isLogoutPopupOpen && <LogoutPopup onClose={closeLogoutPopup} />}
        </>
      )}
    </div>
  );
}