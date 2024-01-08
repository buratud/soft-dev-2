// components DeletePopup.jsx
'use client'
import React, { useRef, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
var cookie = require('js-cookie');

const DeletePopup = ({ onClose, itemId }) => {
  const router = useRouter();
  const popupRef = useRef(null);
  const searchParams = useSearchParams('id')
  var id = searchParams.get("id")

  useEffect(() => {
    const popupElement = popupRef.current;
    console.log("ITEM ID:", id);

    // Apply the zoom-in effect when the component mounts
    popupElement.classList.add('zoom-in');

    return () => {
      // Remove the zoom-in effect when the component unmounts
      popupElement.classList.remove('zoom-in');
    };
  }, []);

  const handleDelete = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/item/delete?items_id=${id}`, {
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + `${cookie.get('token')}`
      },
      credentials: "include",
      method: 'DELETE',
    });
    if (response.ok) {
      // If the delete request is successful, navigate to the items page or perform any other action you need.
      router.push('/items');
    } else {
      // Handle the case where the delete request failed, e.g., show an error message in the console.
      console.error('Error deleting item:', response.statusText);
    }
    console.log('Item Deleted');
  };

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
        <p className="mt-4 mx-3 text-[22px] font-medium">
          Are you sure you want to delete this item?
        </p>
        <div className="absolute bottom-5 left-0 right-0 flex justify-center items-center space-x-4">
          <button onClick={handleDelete} className="p-2 w-28 h-full bg-[#871d1d] text-white font-medium rounded-md text-[18px] hover:bg-[#b85757] transition-all duration-300 ease-in-out">
            <span className="mb-1">Yes</span>
          </button>
          <button onClick={onClose} className="p-2 w-28 h-full bg-[#1d2387] text-white font-medium rounded-md text-[18px] hover:bg-[#286fb5] transition-all duration-300 ease-in-out">
            <span className="mb-1">No</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;