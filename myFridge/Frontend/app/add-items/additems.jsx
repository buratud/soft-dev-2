'use client'

import React, {useState} from 'react';
import { useRouter } from 'next/navigation';
var cookie = require('js-cookie')

export const AddFrame = ({ handleDiscardAction, handleAddAction, handleAlreadyExistedAction }) => {
    const router = useRouter();
    const [file, setFile] = useState()
    const [formData, setFormData] = useState({
        item_name: "",
        quantity: "",
        expiry_date: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAdd = async (e) => {
        e.preventDefault()
        if (!file) return
        // console.log(formData)
        try{
            const data = new FormData()
            var itemInfo = { item_name:formData.item_name, quantity:formData.quantity, expiry_date:formData.expiry_date}
            data.set('image', file)
            data.set('itemInfo',JSON.stringify(itemInfo))
            var response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/item/add", {
                headers:{
                        // 'Accept': 'application/json',
                        // 'Content-Type': 'multipart/form-data;boundary=---WebKitFormBoundary7MA4YWxkTrZu0gW',
                        'Authorization': 'Bearer ' + `${cookie.get('token')}`
                        // 'Host': 'api.producthunt.com'
                } ,
                method: 'POST', 
                body : data
                // body : data
                // body: JSON.stringify({ item_name:formData.item_name, quantity:formData.quantity, expiry_date:formData.expiry_date})
            });
            // Check the response status code
            if (response.status === 200) {
                // Call the handleAddAction function to handle the "Add" action
                handleAddAction();
                console.log('Item Added');
            } else if (response.status === 409) {
                // Call the handleAlreadyExistedAction function to handle the "Already Existed" action
                handleAlreadyExistedAction();
                console.log('Item Already Existed');
            } else {
                console.error('An error occurred:', response.status);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleDiscard = () => {
        // Call the handleDiscardAction function to handle the "discard" action
        handleDiscardAction();
    };

    return (
        <form onSubmit={handleAdd}>
            <div className="sticky h-[calc(100vh-148px)] overflow-auto bg-[#21253180] rounded-[40px] shadow-[0px_0px_10px_8px_#00000040] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] dark:text-gray-100">
                {/* Add item Header */}
                <div className="sticky w-3/5 pt-12 pl-16 font-medium text-4xl text-white">
                    Items
                </div>
                {/* Add item menu */}
                <div className="sticky w-full h-[calc(89vh-120px)] p-16">
                    <div className="sticky w-full h-full bg-[#142741] rounded-[33px] shadow-[0px_0px_10px_3px_#00000040] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)]">
                        <button>
                            <div className="flex relative pt-14 px-14 [font-family:'Manrope-SemiBold',Helvetica] font-SemiBold text-[#ffffff] text-3xl tracking-[0] leading-[normal]">
                                <img
                                    className="w-10 h-10 pl-1 mr-5"
                                    alt="Edit"
                                    src="https://cdn.discordapp.com/attachments/1151835814939078738/1156153038503952454/0d622ecf015f0b97491b26ed4f4d9e38.png?ex=6513eeec&is=65129d6c&hm=6c3d177f07d4df5e0e8914df198e3b1fdf9cc04e5d16a8926b4428e3c51a4bb7&"
                                />
                                Adding Item
                            </div>
                        </button>
                        <div className="flex">
                            <div className="sticky w-64 px-14 pt-10 [font-family:'Manrope-normal',Helvetica] font-normal text-[#ffffff] text-[25px] tracking-[0] leading-[normal]">
                                Name
                            </div>
                            <input
                                type="text"
                                onChange={handleInputChange}
                                name = 'item_name'
                                className=" w-52 mt-5 pl-2 rounded-xl bg-[#40404099] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] dark:text-gray-100  hover:bg-[#41465680] transition-all duration-300 ease-in-out"
                                placeholder="Enter Item Name"
                                style={{ color: "white" }}
                            />
                        </div>

                        <div className="flex">
                            <div className="sticky w-64 px-14 pt-8 [font-family:'Manrope-normal',Helvetica] font-normal text-[#ffffff] text-[25px] tracking-[0] leading-[normal]">
                                Quantity
                            </div>
                            <input
                                type="number"
                                onChange={handleInputChange}
                                name = 'quantity'
                                min = "1"
                                className="w-52 mt-4 pl-2 rounded-xl bg-[#40404099] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] dark:text-gray-100  hover:bg-[#41465680] transition-all duration-300 ease-in-out"
                                placeholder="Enter Quantity"
                                style={{ color: "white" }}
                            />

                        </div>
                        <div className="flex">
                            <div className="sticky w-64 px-14 pt-8 [font-family:'Manrope-normal',Helvetica] font-normal text-[#ffffff] text-[25px] tracking-[0] leading-[normal]">
                                Expiry Date
                            </div>
                            <input
                                type="date"
                                onChange={handleInputChange}
                                name = 'expiry_date'
                                className="w-52 mt-4 pl-2 rounded-xl bg-[#40404099] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] dark:text-gray-100  hover:bg-[#41465680] transition-all duration-300 ease-in-out"
                                style={{ color: "white" }} // Set text color to white
                                placeholder="Select Expiry Date"
                            />
                            <div className="sticky pl-10 pt-6 pb-2 [font-family:'Manrope-normal',Helvetica] font-normal text-[#ffffff] text-[25px] tracking-[0] leading-[normal]">
                                Image
                            </div>
                            {/* Picture Uploader */}
                            <input
                                type="file"
                                name="image"
                                className="w-1/5 mt-6 ml-8 rounded-xl bg-[#21253180] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] dark:text-gray-100 hover:bg-[#41465680] transition-all duration-300 ease-in-out"
                                style={{ color: "white" }} // Set text color to white
                                placeholder="Upload Image"
                                onChange={(e) => setFile(e.target.files?.[0])}
                            />
                        </div>
                        <div className="flex">
                            <button
                                className="sticky mt-12 ml-14 w-40 h-14 bg-[#1d2387] hover:text-[23px] hover:bg-[#286fb5] transition-all duration-300 ease-in-out rounded-[10px] flex justify-center items-center"
                                // onClick={() => handleAdd()}
                                type='submit'
                            >
                                <div className="flex items-center"> {/* Added this div */}
                                    <img
                                        className="w-10 h-10 p-1"
                                        alt="Add"
                                        src="https://cdn.discordapp.com/attachments/1151835814939078738/1156637223408648332/6960dd4be832615dbf7fc16139c09381.png?ex=6515b1db&is=6514605b&hm=003f0fa2ea16c2b2aaed6d196421e86c8ceac05bda820d8230228fec2d756eb1&"
                                    />
                                    <span className="text-[21px] hover:text-[23px] text-white font-medium transition-all duration-300 ease-in-out">
                                        Add
                                    </span> {/* Added text here */}
                                </div>
                            </button>
                            <button
                                className="sticky mt-12 ml-10 w-40 h-14 bg-[#871d1d] hover:text-[23px] hover:bg-[#b85757] transition-all duration-300 ease-in-out rounded-[10px] flex justify-center items-center"
                                onClick={() => handleDiscard()}
                                // type='submit'
                            >
                                <div className="flex items-center"> {/* Added this div */}
                                    <img
                                        className="w-10 h-10 p-1"
                                        alt="discard"
                                        src="https://cdn.discordapp.com/attachments/1151835814939078738/1156637223144394792/44030054813dd4a0f69338ff98f91177.png?ex=6515b1db&is=6514605b&hm=5686ab81a99728b67569d45a02294058f1df8e740911d86f58572b774e5993f1&"
                                    />
                                    <span className="text-[21px] hover:text-[23px] text-white font-medium transition-all duration-300 ease-in-out">Discard</span> {/* Added text here */}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AddFrame;
