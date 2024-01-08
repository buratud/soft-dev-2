// components DeletePopup.jsx
'use client'
import React, { useRef, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
var cookie = require('js-cookie');

const DeletePopup = ({ onClose, userId }) => {
  const router = useRouter();
  const popupRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    const popupElement = popupRef.current;

    // Apply the zoom-in effect when the component mounts
    popupElement.classList.add('zoom-in');

    return () => {
      // Remove the zoom-in effect when the component unmounts
      popupElement.classList.remove('zoom-in');
    };
  }, []);

  const handleInputChange = (e) => {
    const typedValue = e.target.value;
    setInputValue(typedValue);

    // Enable the button if the input value is "DELETE", otherwise disable it
    setIsButtonEnabled(typedValue === 'DELETE');
  };

  const handleLogin = async () => {
    // Redirect to the login page when the "Proceed" button is pressed
    try {
      console.log(userId)
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/prof/delete?user_id=" + userId, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + `${cookie.get('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete profile!');
      }

      const { ok } = await response.json();
      if (ok) router.push('/');
    } catch (error) {
      console.log("Error deleting user!");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div
        ref={popupRef}
        className="w-96 h-96 bg-[#142741] rounded-[35px] shadow-[0px_0px_10px_3px_#00000040] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%) text-white text-center relative transform scale-0"
      >
        <img
          className="w-20 h-20 mx-auto mt-4"
          src="https://cdn.discordapp.com/attachments/1151835814939078738/1158372554810069053/02467da50cc429a1ea1056061d2ffef5.png?ex=651caac2&is=651b5942&hm=72f6c4ec5419e0241730770c1011cb1faab9474c996ea1068357243ba66dd6d2&"
          alt="Icon"
        />
        <p className="mt-4 mx-3 text-[21px] font-medium">
          Are you really sure you want to delete myFridge account?
        </p>
        <p className="mt-3 mx-3 text-[17px] font-medium">
          If yes, please type “DELETE” to proceed.
        </p>
        <input
          type="text"
          placeholder="DELETE"
          className="w-80 h-10 text-center mt-8 rounded-md bg-[#40404099] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] dark:text-gray-100 hover:bg-[#41465680] transition-all duration-300 ease-in-out"
          style={{ color: 'white' }} // Set text color to white
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className="absolute bottom-5 left-0 right-0 flex justify-center items-center space-x-4">
          <button
            onClick={handleLogin}
            className={`p-2 w-28 h-full ${isButtonEnabled ? 'bg-[#871d1d]' : 'bg-gray-500 cursor-not-allowed'
              } text-white font-medium rounded-md text-[18px] hover:bg-[#b85757] transition-all duration-300 ease-in-out`}
            disabled={!isButtonEnabled}
          >
            <span className="mb-1">Proceed</span>
          </button>
          <button
            onClick={onClose}
            className="p-2 w-28 h-full bg-[#1d2387] text-white font-medium rounded-md text-[18px] hover:bg-[#286fb5] transition-all duration-300 ease-in-out"
          >
            <span className="mb-1">Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;