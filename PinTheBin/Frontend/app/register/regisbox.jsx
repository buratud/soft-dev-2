'use client';
import React, { useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import axios from "../httpAxios";

export const RegisterBox = () => {
  const [buttonContent, setButtonContent] = useState({ message: '', bgColor: ''});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setButtonContent({
        message: 'Passwords do not match',
        bgColor: 'bg-ff5151',
      });
      return;
    }

    try {
      // Send registration request to your backend API using Axios
      console.log('Data:', formData);
      const response = await axios.post('http://localhost:8080/register', formData);
      console.log('Response:', response);

      if (response.status === 201) {
        console.log('Registration successful:', response);
        setButtonContent({
          message: 'Registration successful',
          bgColor: '',
        });
        window.location.href = '/';
      }
    } catch (error) {
      setButtonContent({
        message: 'Registration failed',
        bgColor: 'bg-ff5151',
      });
      console.error('Registration error:', error);
    }
  };

  return (
    <div className='bg-ffffff rounded-xl shadow-lg p-8 w-96 m-3 font-NotoSansThai font-medium'>
      <div className='flex items-center justify-between mb-3'>
        <a href='/'>
          {' '}
          <button className='text-xl  focus:outline-none hover:scale-110 transition-all'>
            <IoMdArrowRoundBack size={40} />
          </button>
        </a>
        <h2 className='text-3xl'>สร้างบัญชีใหม่</h2>
        <div className='w-8'></div> {/* Add an empty div for spacing */}
      </div>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='name' className='block text-xl '>
            ชื่อ
          </label>
          <input
            type='text'
            id='name'
            className='w-full px-3 py-2 border border-ebebeb rounded-xl focus:outline-none bg-f4f4f4 font-normal'
            placeholder='ชื่อ'
            required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='email' className='block text-xl '>
            อีเมล
          </label>
          <input
            type='email'
            id='email'
            className='w-full px-3 py-2 border border-ebebeb rounded-xl focus:outline-none bg-f4f4f4 font-normal'
            placeholder='อีเมล'
            required
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='block text-xl '>
            รหัสผ่าน
          </label>
          <input
            type='password'
            id='password'
            className='w-full px-3 py-2 border border-ebebeb rounded-xl focus:outline-none bg-f4f4f4 font-normal'
            placeholder='รหัสผ่าน'
            required
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='confirmPassword' className='block text-xl '>
            ยืนยันรหัสผ่าน
          </label>
          <input
            type='password'
            id='confirmPassword'
            className='w-full px-3 py-2 border border-ebebeb rounded-xl focus:outline-none bg-f4f4f4 font-normal'
            placeholder='ยืนยันรหัสผ่าน'
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                confirmPassword: e.target.value,
              })
            }
          />
        </div>
        <div className='text-center'>
          {buttonContent.message === 'Registration failed' && (
              <p className="text-sm mb-2 text-FF0000 text-white p-2 rounded-md">
                  อีเมลนี้ถูกใช้งานแล้ว
              </p>
          )}
          {buttonContent.message === 'Passwords do not match' && (
              <p className="text-sm mb-2 text-FF0000 text-white p-2 rounded-md">
                  รหัสผ่านไม่ตรงกัน
              </p>
          )}
          <button
            type='submit'
            className={`w-full px-4 py-4 mb-3 bg-blue-500 text-xl text-ffffff rounded-xl hover:scale-105 bg-717171 transition-all ${
              buttonContent.bgColor ? buttonContent.bgColor : 'bg-717171 text-ffffff hover:scale-105'
            }`}
          >
            สร้างบัญชี
          </button>
        </div>
        <div className='text-center pt-2'>
          <p>
            มีบัญชีอยู่แล้ว?{' '}
            <a href='/' className='text-505050 hover:underline'>
              เข้าสู่ระบบที่นี่
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};
