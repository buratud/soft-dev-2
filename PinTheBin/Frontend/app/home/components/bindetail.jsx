import { MdFlag } from "react-icons/md";
import { BiSolidPencil } from "react-icons/bi";
import { MdPinDrop, MdInfo } from "react-icons/md";
import { BsChevronCompactDown } from "react-icons/bs";
import BinTypes from "./bintype";
import React, { useState, useEffect } from "react";
import '../components/style.css';
import Link from 'next/link';
import Image from 'next/image'

const formatDate = (timestamp) => {
    const options = {
        timeZone: 'Asia/Bangkok',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    };
    const date = new Date(timestamp);
    date.setHours(date.getHours() + 7); // Add 7 hours to the date
    const formattedDate = date.toLocaleString('en-GB', options);
    return formattedDate;
};

export const BinDetail = ({ onClose, markerId, setIsBinDetailVisible }) => {
    const [binData, setBinData] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:8080/bin/${markerId}`,{
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
              });
            const data = await response.json();
            setBinData(data.response[0]);
          } catch (error) {
            console.error('Error fetching bin details:', error);
            setBinData(null);
          }
        };
    
        fetchData();
      }, [markerId]);

    if (binData === null) {
        // Handle loading state or error state
        return <p>Loading bin details...</p>; // You can customize this based on your needs
    }
    const activeBinTypes = Object.keys(binData).filter(key => binData[key] === 1);
    console.log('binData:', binData);
    console.log('activeBinTypes:', activeBinTypes);

    return (
        <div className="bin-detail-overlay">
            <div className=" w-full py-10 font-NotoSansThai">
                <div className="bindetail bg-f4f4f4 md:w-96 rounded-xl overflow-y-auto no-scrollbar" style={{ maxHeight: '80vh', overflowScrolling: 'touch' }}>
                    <div className="bin-detail-close flex justify-center bg-f4f4f4 rounded-xl w-full md:w-96 cursor-pointer hover:scale-110 hover:bg-ebebeb transition" onClick={() => { onClose(); setIsBinDetailVisible(false); }}>
                        <BsChevronCompactDown size={50} color="#505050" />
                    </div>
                    <div className="bg-ffffff rounded-xl m-3">
                        <Image
              src={`/data/uploads/${binData.picture}`}
              alt="Background"
              width={0}
              height={0}
              sizes="100vw"
              className="rounded-xl w-full h-full object-cover"
            />
                    </div>
                    <div className="bg-ffffff rounded-xl p-4 m-3">
                        <div className="flex justify-end">
                            <div>
                            <Link href={`/reportbin/${markerId}`}>
                                <button className="bg-ffffff rounded-lg border border-ebebeb p-2 shadow-lg hover:scale-105 hover:bg-ebebeb transition">
                                    <MdFlag size={30} color="#505050" />
                                </button>
                            </Link>
                            </div>
                            <div>
                                <Link href={`/editbin/${markerId}`}>
                                    <button className="bg-ffffff rounded-lg border border-ebebeb p-2 shadow-lg ml-1 hover:scale-105 hover:bg-ebebeb transition">
                                        <BiSolidPencil size={30} color="#505050" />
                                    </button>
                                </Link>
                            </div>
                            
                        </div>
                        <div className="flex justify-start items-center">
                            <MdPinDrop size={30} color="#505050" />
                            <p className="text-2xl font-medium pl-2">ตำแหน่งที่ตั้ง</p>
                        </div>
                        <p className="bin-location text-2xl mt-2 ml-5 mr-5 mb-5 font-normal text-717171">{binData.location}</p>
                        <div className="flex justify-start items-center">
                            <MdInfo size={30} color="#505050" />
                            <p className="text-2xl font-medium pl-2">คำอธิบาย</p>
                        </div>
                        <p className="bin-description text-2xl mt-2 ml-5 mr-5 mb-5 font-normal text-717171">{binData.description}</p>
                        <div className="flex justify-center items-center">
                            <p className="text-2xl font-medium pl-2">ประเภทถังขยะ</p>
                        </div>
                        <div>
                            <BinTypes bins={activeBinTypes} />
                        </div>
                        <p className="flex justify-center text-base font-thin pl-2 mt-5">
                            แก้ไขล่าสุดเมื่อ {formatDate(binData.date)} โดย {binData.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
