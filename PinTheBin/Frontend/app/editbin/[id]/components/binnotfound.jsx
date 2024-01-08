import React from 'react';
import './style.css'

export const BinNotFound = () => {
    const isBinNotFoundVisible = true;
    return (
        <div className="confirm-delete-overlay">
            <div className="flex justify-center w-full font-NotoSansThai">
            <div className={`binnotfound-slide ${isBinNotFoundVisible ? 'open' : ''} bg-f4f4f4 md:w-96 rounded-xl overflow-y-auto no-scrollbar`} style={{ maxHeight: '80vh', overflowScrolling: 'touch' }}>
                    <div className="p-4 m-3">
                        <div className="flex justify-center items-center">
                            <p className="text-2xl font-medium text-505050">ไม่พบถังขยะใบนี้</p>
                        </div>
                        <div className='flex flex-col mt-4'>
                            <a href={`/home`}>
                                <button className="bg-717171 text-ffffff rounded-lg border w-full border-ebebeb p-4 shadow-lg hover:scale-105 hover:bg-505050 transition">
                                    กลับไปหน้าแรก
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}