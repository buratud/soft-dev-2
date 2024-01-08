'use client'

import axios from "./httpAxios";
import React from "react";
import { useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation'

export const LoginBox = () => {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonContent, setButtonContent] = useState({ message: '' });
  let url = 'http://localhost:8080/';

  const handleLogin = async () => {
    try {
        const response = await axios.post(`${url}login`, {
            email,
            password,
        });

        if (response.status === 200) {
            // Store the token in local storage or a cookie
            localStorage.setItem('token', response.data.token);
            setButtonContent({
              message: 'Login successful',
              bgColor: '',
            });
            console.log('Login successful:', response);
            // router.push('/home');
            // await axios.get(`${url}`, {
            //   headers: {
            //     Authorization: `Bearer ${response.data.token}`,
            //   },
            // });
            router.push('/home');
        }
      }
     catch (error) {
        console.error('Login failed:', error);
        setButtonContent({
          message: 'Email or password is incorrect',
          bgColor: 'bg-ff5151',
        });
        
    }
  }


  return (
    <div className='bg-ffffff rounded-xl shadow-lg p-8 w-96 m-3 font-NotoSansThai font-medium'>
        <div className="text-center mb-3">
          <h2 className="text-3xl">เข้าสู่ระบบด้วยอีเมล</h2>
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-xl text-gray-600">อีเมล</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-ebebeb rounded-xl focus:outline-none bg-f4f4f4 font-normal"
              placeholder="อีเมล"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-xl text-gray-600">รหัสผ่าน</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-ebebeb rounded-xl focus:outline-none bg-f4f4f4 font-normal"
              placeholder="รหัสผ่าน"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-right mb-4">
            <a href="/forgot" className="text-505050 hover:underline">ลืมรหัสผ่าน</a>
          </div>
          <div className="text-center">
              {buttonContent.message === 'Email or password is incorrect' && (
              <p className="text-sm mb-2 text-FF0000 text-white p-2 rounded-md">
                  อีเมลหรือรหัสผ่านไม่ถูกต้อง
              </p>
            )}
            <button
              type="button"
              className={`w-full px-4 py-4 mb-3 text-xl text-ffffff rounded-xl bg-717171 hover:scale-105 transition-all ${
              buttonContent.bgColor ? buttonContent.bgColor : 'bg-717171 text-ffffff hover:scale-105'
              }`}
              onClick={handleLogin}
            >
              เข้าสู่ระบบ
            </button>
          </div>
          <div className="text-center pt-2">
            <p>ยังไม่มีบัญชี? <Link href="/register" className="text-505050 hover:underline">สร้างบัญชีที่นี่</Link></p>
          </div>
          <div className='font-NotoSansThai py-1 text-center'>
            <p className='text-xs text-bdbdbd'>Version 1.0</p>
          </div>
        </form>
      </div>
  );
};
