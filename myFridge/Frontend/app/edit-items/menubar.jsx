"use client"

import React from 'react';
import { useRouter } from 'next/navigation';

export const MenuBar = ({handleLogoutAction}) => {
    const router = useRouter();

    const handleLogout = () => {
        // Call the handleLogoutAction function to handle the "logout" action
        handleLogoutAction();
      };
    
    const backHome = () => {
        // Redirect to the home page
        router.push('/dashboard');
    };

    return (
        <nav className="sticky flex bg-[#21253180]">
            {/* logo */}
            <div className="flex container top-0 w-1/4 z-10 ml-5 justify-between items-center">
                <a
                    href="#"
                    onClick={backHome}
                    className="relative w-16 h-16 pl-9 cursor-pointer"
                >
                    <img
                        src="https://cdn.discordapp.com/attachments/1151835814939078738/1156942482500767834/image__1_-removebg-preview_1.png?ex=6516ce26&is=65157ca6&hm=0414d5fa6ea89ee386e33906c3d3018918b4da22d5157dc8607d0dc9b447b51a&" // Replace with the path to your image
                        alt="myFridge Logo"
                        className="w-full h-full object-contain transition-transform transform scale-110 hover:scale-125 duration-300 ease-in-out"
                    />
                </a>
            </div>
            {/* nav bar */}
            <div className="flex w-3/4 justify-end 2xl:hidden">
                <div className="flex items-center pr-12 font-Manrope font-normal text-white text-[18px]">
                    <div>
                        <a href="#" className="text-white hover:underline hover:text-[20px] px-8 transition-all duration-300 ease-in-out" 
                        onClick={() => router.push('/dashboard')}>Dashboard</a>
                        <a href="#" className="text-red-300 hover:underline hover:text-[20px] px-8 transition-all duration-300 ease-in-out"
                        onClick={() => router.push('/items')}>Items</a>
                        <a href="#" className="text-white hover:underline hover:text-[20px] pl-8 pr-10 transition-all duration-300 ease-in-out"
                        onClick={() => router.push('/app-settings')}>App Settings</a>
                    </div>
                    <a href="#" onClick={() => router.push('/account-settings')}>
                        <img
                            src="https://media.discordapp.net/attachments/1151835814939078738/1151836796276199434/imp-profilepic.png?width=412&height=412"
                            alt="Profile Picture"
                            className="w-12 h-12 hover:w-14 hover:h-14 rounded-full cursor-pointer transition-all duration-300 ease-in-out"
                        />
                    </a>
                    <a href="#" onClick={handleLogout}>
                        <img
                            src="https://cdn.discordapp.com/attachments/1151835814939078738/1151836795621888080/icon-signout.png?ex=6516b01c&is=65155e9c&hm=eb7b7b75d904b6ea3338fd7ebbf185f68928ce06c611bb9905682c4339adc301&"
                            alt="Profile Picture"
                            className="w-10 h-10 ml-8 hover:w-14 hover:h-14 rounded-full cursor-pointer transition-all duration-300 ease-in-out"
                        />
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default MenuBar;