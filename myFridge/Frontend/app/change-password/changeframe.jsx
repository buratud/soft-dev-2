'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export const ChangeFrame = ({ handleChangeAction, handleBackAction }) => {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isFormValid = () => {
    // Check if all input fields have non-empty values
    return oldPassword.trim() !== '' && newPassword.trim() !== '' && confirmPassword.trim() !== '';
  };

  const handleChange = () => {
    if (!isFormValid()) {
      // Display an error message or handle the case where the form is not valid
      alert('Please fill in all the fields.');
      return;
    }

    // Validation logic for confirm password
    if (newPassword !== confirmPassword) {
      // Display an error message or handle the mismatch
      alert('Password and confirmation password do not match.');
      return;
    }

    // Validation logic for old and new password
    if (oldPassword == newPassword) {
      // Display an error message or handle the match
      alert('Old password and new password is the same.');
      return;
    }

    // If validation is successful, call handleChangeAction
    handleChangeAction();
  };

  const handleBack = () => {
    // call handleChangeAction when "Back" button is pressed
    handleBackAction()
  };

  return (
    <div className="font-Manrope w-1/3">
      <div className="flex flex-col items-center justify-center py-12 px-12 overflow-auto bg-[#21253180] rounded-[40px] shadow-[0px_0px_10px_8px_#00000040] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] dark:text-gray-100">
        <h2 className="text-4xl text-white font-semibold mb-7">Change Password</h2>
        <div className="mb-4 w-full">
          <label className="block text-gray-300 text-[21px] font-medium mb-2">Old Password</label>
          <input
            type="password"
            className="bg-[#40404099] hover:bg-[#5c5c5c99] rounded-[15px] transition-all duration-300 ease-in-out text-[17px] pl-[10px] font-family:'Manrope-Regular',Helvetica font-light py-2 px-3 w-full text-white"
            placeholder="Enter your old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block text-gray-300 text-[21px] font-medium mb-2">New Password</label>
          <input
            type="password"
            className="bg-[#40404099] hover:bg-[#5c5c5c99] rounded-[15px] transition-all duration-300 ease-in-out text-[17px] pl-[10px] font-family:'Manrope-Regular',Helvetica font-light py-2 px-3 w-full text-white"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block text-gray-300 text-[21px] font-medium mb-2">Confirm Password</label>
          <input
            type="password"
            className="bg-[#40404099] hover:bg-[#5c5c5c99] rounded-[15px] transition-all duration-300 ease-in-out text-[17px] pl-[10px] font-family:'Manrope-Regular',Helvetica font-light py-2 px-3 w-full text-white"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-center pt-5 w-full">
          <div className="mr-4">
            <button
              className="sticky w-36 bg-[#871d1d] text-[20px] hover:bg-[#b85757] text-white py-2 px-4 transition-all duration-300 ease-in-out rounded-[10px] flex justify-center items-center"
              onClick={handleChange}
            >
              <div className="flex items-center">
                <span className="text-[21px]"> Change</span>
              </div>
            </button>
          </div>
          <div className="ml-4">
            <button
              className="sticky w-36 bg-[#1d2387] text-[20px] hover:bg-[#286fb5] text-white py-2 px-4 transition-all duration-300 ease-in-out rounded-[10px] flex justify-center items-center"
              onClick={handleBack}
            >
              <div className="flex items-center">
                <span className="text-[21px]"> Back</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeFrame;

