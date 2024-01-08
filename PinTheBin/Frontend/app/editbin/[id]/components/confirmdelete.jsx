import React, { useState } from 'react';
import Image from 'next/image'
import './style.css'

export const ConfirmDelete = ({ onCancelDelete, onConfirmDelete, isVisible }) => {
    // ... (other states and functions)
    const [isDeleteClicked, setisDeleteClicked] = useState(false);
    const handleCancel = () => {
        onCancelDelete();
      };

    const buttonDelContent = isDeleteClicked ? (
    <>
        <Image
        src="/static/Checkmark.png"
        alt="ลบถังขยะ"
        width="96"
        height="96"
        className="w-6 h-6"
        />
    </>
    ) : (
    'ยืนยันการลบถังขยะ'
    );

    const handleConfirmDelete = () => {
        onConfirmDelete(); // Call the onConfirmDelete function passed from the parent component
        setisDeleteClicked(true);
      };

    return (
        <div className="confirm-delete-overlay">
            <div className="flex justify-center w-full font-NotoSansThai">
                <div className={`confirmdelete-slide ${isVisible ? 'open' : ''} bg-f4f4f4 md:w-96 rounded-xl overflow-y-auto no-scrollbar`} style={{ maxHeight: '80vh', overflowScrolling: 'touch' }}>
                    <div className="p-4 m-3">
                        <div className="flex justify-center items-center">
                            <p className="text-2xl font-medium text-505050">ยืนยันการลบถังขยะ</p>
                        </div>
                        <div className="flex justify-center items-center">
                            <p className="text-base font-thin text-505050">คุณต้องการลบถังขยะนี้ใช่หรือไม่</p>
                        </div>
                        <div className='flex flex-col mt-4'>
                            {/* <a href='/home' className='flex flex-col mt-4 '> */}
                            <button
                                onClick={handleConfirmDelete}
                                className={`flex items-center justify-center rounded-lg border border-ebebeb p-4 shadow-lg hover:scale-105 transition mb-2 ${
                                isDeleteClicked ? 'bg-39da00 text-ffffff' : 'bg-ff5151 text-ffffff hover:bg-FF0000'
                                }`}
                            >
                                {buttonDelContent}
                            </button>
                            {/* </a> */}
                            <button className="bg-717171 text-ffffff rounded-lg border border-ebebeb p-4 shadow-lg hover:scale-105 hover:bg-505050 transition"
                                onClick={handleCancel}
                            >
                                ยกเลิก
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}