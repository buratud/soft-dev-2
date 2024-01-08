'use client'

import React, { useState, useEffect } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import Image from 'next/image'
import axios from "../httpAxios";

export default function AppReport() {
  const [headerName, setHeaderName] = useState('');
  const [reportCategory, setReportCategory] = useState('');
  const [reportContent, setReportContent] = useState('');
  const [buttonContent, setButtonContent] = useState({
    imgUrl: '',
    bgColor: '',
    message: '',
  });

  const submitReport = async () => {
    try {
      if (!headerName) {
        setButtonContent({
          imgUrl: '/static/Cancel.png',
          bgColor: 'bg-ff5151',
          message: 'please fill in the header',
        });
        return;
      }

      if (!reportCategory) {
        setButtonContent({
          imgUrl: '/static/Cancel.png',
          bgColor: 'bg-ff5151',
          message: 'please select a category',
        });
        return;
      }

      if (reportCategory === 'อื่น ๆ' && !reportContent) {
        setButtonContent({
          imgUrl: '/static/Cancel.png',
          bgColor: 'bg-ff5151',
          message: 'please fill in the description',
        });
        return;
      }

      const response = await axios.post('http://localhost:8080/appReport', {
         // Replace with actual user ID or username
        description: reportContent,
        category: reportCategory,
        header: headerName, // Replace with actual header
      },{
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
      });

      console.log(response);

      if (response.data.error) {
        // If there is an error, set appropriate feedback
        setButtonContent({
          imgUrl: '/static/Cancel.png',
          bgColor: 'bg-ff5151',
          message: response.data.message,
        });
      } else {
        // If successful, set appropriate feedback
        setButtonContent({
          imgUrl: '/static/Checkmark.png',
          bgColor: 'bg-39da00',
          message: 'รายงานเรียบร้อยแล้ว',
        });
        // setIsButtonClicked(true);
        window.location.href = '/home';
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      // Set appropriate feedback for the error
      setButtonContent({
        imgUrl: '/static/Cancel.png',
        bgColor: 'bg-ff5151',
        message: 'เกิดข้อผิดพลาดในการรายงาน',
      });
    }
  };

  const reportCategories = [
    'ปัญหาการใช้งานทั่วไปใน Pin The Bin',
    'ไม่สามารถหาตำแหน่งปัจจุบันได้',
    'ส่งข้อเสนอแนะ',
    'อื่น ๆ',
  ];

  return (
    <div className="bg-f4f4f4 p-8 min-h-screen font-NotoSansThai font-medium">
      <div className="flex items-center justify-between mb-3">
        <a href="/home">
          <button className="text-xl focus:outline-none hover:scale-110 transition-all">
            <IoMdArrowRoundBack size={40} />
          </button>
        </a>
        <h2 className="text-3xl">รายงาน</h2>
        <div className="w-8"></div>
      </div>

      <div className="p-8 flex flex-col justify-center items-center">
        <form>
          <div className="mb-4">
            <label htmlFor="description" className="block text-xl text-left mb-1">
              หัวข้อการรายงาน
            </label>
            <textarea
              type="text"
              id="description"
              className="block p-4 border border-ebebeb rounded-xl focus:outline-none bg-ffffff font-normal w-full"
              placeholder="เพิ่มหัวข้อการรายงาน"
              required
              value={headerName}
              onChange={(e) => setHeaderName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="reportCategory" className="block text-xl text-left mb-1">
              หมวดหมู่การรายงาน
            </label>
            <select
              id="reportCategory"
              className="block p-4 border border-ebebeb rounded-xl focus:outline-none bg-ffffff font-normal w-full"
              value={reportCategory}
              required
              onChange={(e) => setReportCategory(e.target.value)}
            >
              <option value="" disabled>Select a category</option>
              {reportCategories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="">
            <label htmlFor="reportContent" className="block text-xl text-left mb-1">
              เนื้อหาการรายงาน
            </label>
            <textarea
              type="text"
              id="reportContent"
              className="block p-4 border border-ebebeb rounded-xl focus:outline-none bg-ffffff font-normal w-full"
              placeholder="เพิ่มเนื้อหาการรายงาน"
              required
              value={reportContent}
              onChange={(e) => setReportContent(e.target.value)}
            />
          </div>
        </form>
      </div>

      <div className="flex flex-col items-center justify-center mt-4">
        {/* <a href="/home"> */}
          {buttonContent.message === 'this report has been in database' && (
            <p className="text-sm mb-2 text-FF0000 text-white p-2 rounded-md">
              รายงานฉบับนี้มีอยู่แล้ว
            </p>
          )}
          {buttonContent.message === 'please select a category' && (
            <p className="text-sm mb-2 text-FF0000 text-white p-2 rounded-md">
              กรุณาเลือกหมวดหมู่การรายงาน
            </p>
          )}
          {buttonContent.message === 'please fill in the description' && (
            <p className="text-sm mb-2 text-FF0000 text-white p-2 rounded-md">
              กรุณากรอกคำอธิบายเพิ่มเติม
            </p>
          )}
          {buttonContent.message === 'please fill in the header' && (
            <p className="text-sm mb-2 text-FF0000 text-white p-2 rounded-md">
              กรุณากรอกหัวข้อการรายงาน
            </p>
          )}
          <button
            onClick={submitReport}
            className={`flex items-center justify-center p-4 w-60 py-2 px-4 rounded-lg transition-all focus:outline-none ${
              buttonContent.bgColor ? buttonContent.bgColor : 'bg-717171 text-ffffff hover:scale-105'
            }`}
          >
            {buttonContent.message ? (
              <>
                <Image
                  src={buttonContent.imgUrl}
                  alt="รายงานถังขยะ"
                  width="100"
                  height="100"
                  className="w-6 h-6"
                />
              </>
            ) : (
              'ยืนยันการรายงาน'
            )}
          </button>
        {/* </a> */}
      </div>
    </div>
  );
};