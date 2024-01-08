import React from 'react';
import Image from 'next/image'

export const AddBinBtn = () => {
  return (
    <div className="flex justify-center">
      <button
        type="button"
        className="bg-ffffff text-white rounded-full p-5 shadow-lg font-NotoSansThai font-medium text-xl hover:scale-105 hover:bg-ebebeb transition-all"
      >
        <Image
          src="/static/AddTrash.png"
          className="inline-block w-10 h-10"
          width="84"
          height="88"
          alt="Add Trash"
        />
      </button>
    </div>
  );
};
