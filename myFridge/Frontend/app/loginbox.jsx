'use client'
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

var cookie = require('js-cookie')

require('dotenv').config({ path: __dirname+'../.env' });

var CryptoJS = require("crypto-js");

export const Box = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    emailusername: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDashboard = async () => {
    var encrypted = CryptoJS.AES.encrypt(formData.password,formData.emailusername).toString()
    console.log("URL : ",process.env.NEXT_PUBLIC_API_URL)
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
      headers: {'Authorization': 'Basic' + btoa(`${formData.emailusername}:${CryptoJS.AES.encrypt(formData.password,formData.emailusername).toString()}`)},
      credentials: "include"
    });
    console.log("Key : ",process.env.NEXT_SECRET_AES_KEY)
    console.log("URL : ",process.env.NEXT_PUBLIC_API_URL)
    const json = await response.json();
    // token = json.token
    cookie.set('token',json.token || "");
    if (json.ok == true) router.push('/dashboard');
    else
      alert(json.error);
  };

  const handleForgot = () => {
    router.push('/forgot-password'); // Redirect to /forgot-password
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Flex Container */}
      {/* Text Group */}
      <div className="text-group">
        <div className="w-[516px] h-[116px]">
          <div className="flex flex-col items-start gap-[10px] relative w-[516px] h-[116px]">
            <div className="relative self-stretch [font-family:'Manrope-Bold',Helvetica] font-bold text-white text-[60px] text-center tracking-[0] leading-[normal]">
              <div className="flex justify-center">
                {/* Image */}
                <img
                  src="https://cdn.discordapp.com/attachments/1151835814939078738/1157157604334784583/image-modified_2.png?ex=6517967f&is=651644ff&hm=e3a9049bb08e459547a253d830725fdf466d7296098f295a5d907b94e76105b1&" // Replace with the actual path to your image
                  alt="Fridge Image"
                  className="w-20 h- mr-4" // Adjust the width and height as needed
                />
                <span className="[font-family:'Manrope',Helvetica] font-semibold text-white text-[60px] tracking-[0]">
                  myFridge
                  <br />
                </span>
              </div>
            </div>
            <p className="relative self-stretch [font-family:'Manrope',Helvetica] font-medium text-white text-[25px] text-center tracking-[0] leading-[normal]">
              <span className="text-[25px]">Your personal fridge management website.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Spacing */}
      <div className="mt-10"/>

      {/* Login Box Group */}
      <div className="login-box-group">
        <div className="inline-flex flex-col items-start gap-[10px] relative">
          <div className="relative w-[675px] h-[375px] bg-[#21253180] rounded-[55px] shadow-[0px_0px_10px_8px_#00000040] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)]" />
          <div className="absolute top-[47px] left-[58px] font-family:'Manrope-Regular',Helvetica font-light text-white text-[20px] tracking-[0] leading-[normal]">
            Username or Email
          </div>
          <div className="absolute top-[80px] left-[58px] right-[58px]">
            <input
              type="text"
              placeholder="Required"
              className="w-full h-[50px] bg-[#40404099] rounded-[15px] text-white text-[20px] pl-[10px] font-family:'Manrope-Regular',Helvetica font-light"
              name="emailusername"
              value={formData.emailusername}
              onChange={handleInputChange}
              required // Add the required attribute
            />
          </div>
          <div className="absolute top-[149px] left-[58px] font-family:'Manrope-Regular',Helvetica font-light text-white text-[20px] tracking-[0] leading-[normal]">
            Password
          </div>
          <div className="absolute top-[182px] left-[58px] right-[58px]">
            <input
              type="password"
              placeholder="Required"
              className="w-full h-[50px] bg-[#40404099] rounded-[15px] text-white text-[20px] pl-[10px] font-family:'Manrope-Regular',Helvetica font-light"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required // Add the required attribute
            />
          </div>
          <div className="absolute w-[133px] h-[54px] top-[289px] left-[271px]">
            <div className="relative w-[133px] h-[54px] bg-[#1d2387] rounded-[15px]">
              <button
                type="button"
                className="w-full h-full font-family:'Manrope-Regular',Helvetica font-normal text-white text-[30px] text-center tracking-[0] leading-[normal] hover:bg-[#000000] hover:rounded-[15px] transition-colors duration-300"
                onClick={handleDashboard}
              >
                Sign in
              </button>
            </div>
          </div>
          {/* Forgot Password Text
          <div className="absolute top-[240px] left-[58px] font-family:'Manrope',Helvetica font-light text-[20px] text-[#4950f9] cursor-pointer">
            <a href="#" onClick={handleForgot}>Forgot Password?</a>
          </div> */}
        </div>
      </div>
    </div>
  );
};
