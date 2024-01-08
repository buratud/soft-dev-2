// components AreadyExistedPopup.jsx
'use client'
import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AreadyExistedPopup = ({ onClose }) => {
  const router = useRouter();
  const popupRef = useRef(null);

  useEffect(() => {
    const popupElement = popupRef.current;

    // Apply the zoom-in effect when the component mounts
    popupElement.classList.add('zoom-in');

    return () => {
      // Remove the zoom-in effect when the component unmounts
      popupElement.classList.remove('zoom-in');
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div
        ref={popupRef}
        className="w-96 h-64 bg-[#142741] rounded-[35px] shadow-[0px_0px_10px_3px_#00000040] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%) text-white text-center relative transform scale-0"
      >
        <img
          className="w-20 h-20 mx-auto mt-4"
          src="https://cdn.discordapp.com/attachments/1151835814939078738/1158372555258871808/dc65b7d3af0ed3459dd14a91081b78d6.png?ex=651c0202&is=651ab082&hm=1231bbf1ebf9bd4b94b080ee66f9f64267ac87eff2899cbf003fd6ac413cfaee&"
          alt="Icon"
        />
        <p className="mt-7 mx-3 text-[22px] font-medium">
          Item Name Already Existed.
        </p>
        <div className="absolute bottom-5 left-0 right-0 flex justify-center items-center space-x-4">
          <button onClick={onClose} className="p-2 w-28 h-full bg-[#1d2387] text-white font-medium rounded-md text-[18px] hover:bg-[#286fb5] transition-all duration-300 ease-in-out">
            <span className="mb-1">Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AreadyExistedPopup;