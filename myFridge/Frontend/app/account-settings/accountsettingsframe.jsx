import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { headers } from '@/next.config';
var cookie = require('js-cookie')

export const AccountSettingsFrame = ({ handleDiscardAction, handleSaveAction, handleDeleteAction }) => {
    const router = useRouter();

    useEffect(() => {
        fetchUserData()
    }, []);

    const [formData, setFormData] = useState({
        email: '',
        display_name: '',
        username: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        if (!value) return;
        setFormData({ ...formData, [name]: value });
    };

    const NotiCheckboxChange = (option) => {
        setOption(option);
    };

    // const handleChangeClick = () => {
    // };

    const handleChangePass = () => {
        router.push('/change-password'); // Redirect to /change-password
    };

    const handleSave = async () => {
        const formDataToSend = new FormData();
        const data = new URLSearchParams();
        for (const [key, value] of Object.entries(formData)) {
            data.append(key, value);
        }
        console.log(formDataToSend)
        try {
            console.log('Change Saved');
            console.log("XDDDDD", formDataToSend)
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/prof/edit", {
                headers: { 'Authorization': 'Bearer ' + `${cookie.get('token')}`, 'Content-Type': 'application/json' },
                method: 'PUT',
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Save successful, you can handle the response here if needed
                handleSaveAction();
            } else {
                console.error('Failed to save:', response.status, response.statusText);
                // Handle save failure here, display an error message, etc.
            }
        } catch (error) {
            console.error('An error occurred during save:', error);
            // Handle network errors or other exceptions here
        }
    };

    const handleDiscard = () => {
        handleDiscardAction();
    };

    const handleDelete = () => {
        handleDeleteAction(formData.user_id);
    };

    const fetchUserData = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/user/info", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + `${cookie.get('token')}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch profile data');
            }

            const { userData:responseData } = await response.json();
            console.log("Trying to get user data");
            console.log(responseData);
            setFormData({ ...formData, ...responseData });

        } catch (error) {
            console.log("Error while fetching userData");
            console.error(error);
        }
    };

    return (
        // Dashboard Header
        <div className="sticky h-[calc(100vh-148px)] overflow-auto bg-[#21253180] rounded-[40px] shadow-[0px_0px_10px_8px_#00000040] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] dark:text-gray-100">
            {/* Account Settings Header */}
            <div className="flex">
                <div className="sticky pt-12 pl-16 font-medium text-4xl text-white">
                    Account Settings
                </div>
            </div>
            <a style={{ color: "gray", position: "absolute", left: "270px", top: "160px", fontSize: "25px" }}>
                Display Name
            </a>
            <a style={{ color: "white", position: "absolute", left: "270px", top: "200px", fontSize: "32px" }}>
                {formData?.display_name ?? 'Loading...'}
            </a>
            <div className="flex items-center p-10">
                <img
                    src="https://media.discordapp.net/attachments/1151835814939078738/1151836796276199434/imp-profilepic.png?width=412&height=412"
                    alt=""
                    className="rounded-full w-40 h-40 dark:bg-gray-500 ml-5"
                />
            </div>
            {/* <button
                style={{ position: "absolute", left: "80px", top: "310px" }}
                className="w-30 h-12 text-[21px] hover:text-[23px] bg-green-950 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-all duration-300 ease-in-out"
                onClick={handleChangeClick}
            >
                Change
            </button> */}
            {/* Forms */}
            <div className="w-3/5 pl-14 ml-6">
                <div className="mb-4">
                    <label className="block text-white text-[21px] mb-2">Email</label>
                    <input
                        type="text"
                        name="email"
                        onChange={handleInputChange}
                        placeholder={formData?.email ?? 'Loading...'}                        
                        className="w-full px-4 py-2 rounded-lg bg-[#40404099] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] dark:text-gray-100  hover:bg-[#41465680] transition-all duration-300 ease-in-out"
                        style={{ color: "white" }} // Set text color to white
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white text-[21px] mb-2">Display Name</label>
                    <input
                        type="text"
                        name="display_name"
                        onChange={handleInputChange}
                        placeholder={formData?.display_name ?? 'Loading...'}
                        className="w-full px-4 py-2 rounded-lg bg-[#40404099] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] dark:text-gray-100  hover:bg-[#41465680] transition-all duration-300 ease-in-out"
                        style={{ color: "white" }} // Set text color to white
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white text-[21px] mb-2">Username</label>
                    <input
                        type="text"
                        name="username"
                        onChange={handleInputChange}
                        placeholder={formData?.userData ?? 'Loading...'}
                        className="w-full px-4 py-2 rounded-lg bg-[#40404099] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] dark:text-gray-100  hover:bg-[#41465680] transition-all duration-300 ease-in-out"
                        style={{ color: "white" }} // Set text color to white
                    />
                </div>
                {/* Buttons */}
                <div className="mb-4">
                    {/* <a style={{ color: "white", position: "absolute", left: "80px", top: "690px", fontSize: "21px" }}>
                        Password
                    </a>
                    <button className="text-white text-[20px] mt-8 mb-4 hover:underline"
                        onClick={handleChangePass}>
                        Change password?
                    </button> */}
                    {/* Save and Discard buttons */}
                    <div className="flex mt-10 space-x-10">
                        <button
                            className="sticky w-44 bg-[#1d2387] text-[20px] hover:bg-[#286fb5] text-white py-2 px-4 transition-all duration-300 ease-in-out rounded-[10px] flex justify-center items-center"
                            onClick={handleSave}
                        >
                            <div className="flex items-center"> {/* Added this div */}
                                <img
                                    className="w-10 h-10 p-1"
                                    alt="discard"
                                    src="https://cdn.discordapp.com/attachments/1151835814939078738/1156637223408648332/6960dd4be832615dbf7fc16139c09381.png?ex=6515b1db&is=6514605b&hm=003f0fa2ea16c2b2aaed6d196421e86c8ceac05bda820d8230228fec2d756eb1&"
                                />
                                <span className="text-[21px] hover:text-[23px] transition-all duration-300 ease-in-out"> Save</span> {/* Added text here */}
                            </div>
                        </button>
                        <button
                            className="sticky w-44 bg-[#871d1d] text-[20px] hover:bg-[#b85757] text-white py-2 px-4 transition-all duration-300 ease-in-out rounded-[10px] flex justify-center items-center"
                            onClick={handleDiscard}
                        >
                            <div className="flex items-center"> {/* Added this div */}
                                <img
                                    className="w-10 h-10 p-1"
                                    alt="discard"
                                    src="https://cdn.discordapp.com/attachments/1151835814939078738/1156637223144394792/44030054813dd4a0f69338ff98f91177.png?ex=6515b1db&is=6514605b&hm=5686ab81a99728b67569d45a02294058f1df8e740911d86f58572b774e5993f1&"
                                />
                                <span className="text-[21px] hover:text-[23px] transition-all duration-300 ease-in-out">Discard</span> {/* Added text here */}
                            </div>
                        </button>
                    </div>
                    {/* Danger Zone */}
                    <div className=" py-8 mt-4">
                        <p className="text-[#ff7e7e] text-[20px]">Danger Zone</p>
                        <button
                            className="sticky w-64 pb- text-white text-[20px] mt-2 bg-[#871d1d] hover:bg-[#b85757] py-2 px-4 transition-all duration-300 ease-in-out rounded-[10px] flex justify-center items-center"
                            onClick={handleDelete}
                        >
                            <div className="flex items-center"> {/* Added this div */}
                                <img
                                    className="w-10 h-10 p-1"
                                    alt="discard"
                                    src="https://cdn.discordapp.com/attachments/1151835814939078738/1156809109019054120/icons8-trash-96.png?ex=651651f0&is=65150070&hm=8c16af1e311472535246adc8103d10e6854b848ef586c0e7e186d5d7227a8553&"
                                />
                                <span className="text-[20px] hover:text-[22px] transition-all duration-300 ease-in-out">Delete Account</span> {/* Added text here */}
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSettingsFrame;
