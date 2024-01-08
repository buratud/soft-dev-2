'use client'
import React, { useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { BsFillPinMapFill } from 'react-icons/bs';

export default function Profile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const saveProfile = () => {
        console.log('Profile saved:', { name, email, profilePicture });
    };

    const changePassword = () => {
        console.log('Password changed:', { oldPassword, newPassword, confirmNewPassword });
    };

    

    return (
        <div className="bg-f4f4f4 p-8 min-h-screen font-NotoSansThai font-medium">
            <div className="flex items-center justify-between mb-3">
                <a href="/home">
                    <button className="text-xl focus:outline-none hover:scale-110 transition-all">
                        <IoMdArrowRoundBack size={40} />
                    </button>
                </a>
                <h2 className="text-3xl">โปรไฟล์</h2>
                <div className="w-8"></div>
            </div>

            <div className="p-8 flex flex-col justify-center items-center">
                {/* First Section: Profile Details */}
                <div className="flex mb-6">
                    {/* Left Section: Name and Email */}
                    <div className="flex flex-col">
                        <label htmlFor="name" className="block text-xl text-gray-600">ชื่อ</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-ebebeb rounded-xl focus:outline-none bg-ffffff font-normal mb-4"
                            placeholder="ชื่อ"
                            required
                        />
                        <label htmlFor="email" className="block text-xl text-gray-600">อีเมล</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-ebebeb rounded-xl focus:outline-none bg-ffffff font-normal"
                            placeholder="อีเมล"
                            required
                        />
                    </div>

                    {/* Right Section: Profile Picture */}
                    <div className="ml-8 flex flex-col items-center">
                        <label className="mb-2">รูปภาพโปรไฟล์</label>
                        <div className="rounded-full overflow-hidden border h-24 w-24 mb-4 cursor-pointer border-717171">
                            {profilePicture ? (
                                <img
                                    src={profilePicture}
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                    onClick={() => document.getElementById('fileInput').click()}
                                />
                            ) : (
                                <div
                                    className="h-full w-full bg-ebebeb text-sm flex items-center justify-center hover:bg-e0e0e0 transition"
                                    onClick={() => document.getElementById('fileInput').click()}
                                >
                                    อัปโหลดรูปภาพ
                                </div>
                            )}
                        </div>
                        <input
                            id="fileInput"
                            type="file"
                            onChange={handleProfilePictureChange}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>

                {/* Save Button */}
                <button
                    className="flex items-center justify-center p-4 w-80 py-2 px-4 rounded-lg transition-all focus:outline-none bg-717171 text-ffffff hover:scale-105"
                    onClick={saveProfile}
                >
                    บันทึก
                </button>
            </div>      
            <div className='flex flex-col justify-center items-center'>  
                {/* Second Section: Password Change */}
                <div className="mt-8 mb-6">
                    <h3 className="flex justify-center text-2xl mb-4 mt-4">เปลี่ยนรหัสผ่าน</h3>
                    <div className="mb-4">
                        <label className="block mb-2">รหัสผ่านเก่า</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="mb-4 w-full px-3 py-2 border border-ebebeb rounded-xl focus:outline-none bg-ffffff font-normal"
                            placeholder="กรอกรหัสผ่านเก่า"
                            required
                       />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">รหัสผ่านใหม่</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="mb-4 w-full px-3 py-2 border border-ebebeb rounded-xl focus:outline-none bg-ffffff font-normal"
                            placeholder="กรอกรหัสผ่านใหม่"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">ยืนยันรหัสผ่านใหม่</label>
                        <input
                            type="password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            className="mb-4 w-full px-3 py-2 border border-ebebeb rounded-xl focus:outline-none bg-ffffff font-normal"
                            placeholder="กรอกรหัสผ่านใหม่อีกครั้ง"
                            required
                        />
                    </div>

                    <button
                        className="flex items-center justify-center p-4 w-80 py-2 px-4 rounded-lg transition-all focus:outline-none bg-717171 text-ffffff hover:scale-105"
                        onClick={changePassword}
                    >
                        ยืนยันการเปลี่ยนรหัสผ่าน
                    </button>
                </div>
            </div>  
        </div>
    );
}
