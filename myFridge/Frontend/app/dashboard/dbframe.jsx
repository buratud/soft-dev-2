import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
var cookie = require('js-cookie')

export const DashboardFrame = () => {
    const router = useRouter();
    const [itemCount, setItemCount] = useState(null);
    const [expireCount, setExpireCount] = useState(null);
    const [data, setData] = useState([]); // State to hold the fetched data
    const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query
    // console.log(itemCount)

    var itemNumber = 0;
    useEffect(() => {
        fetchData();
        fetchItemCount(); // Added fetchItemCount here
        fetchExpireCount(); // Added fetchExpireCount here
    }, [searchQuery]); // Listen for changes in the search query

    // Function to format date as per your requirement
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options).replace(',', '');
    };

    const fetchItemCount = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/item/count", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + `${cookie.get('token')}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch item count');
            }

            const responseData = await response.json();
            console.log("Trying to get item count");
            console.log(responseData);
            setItemCount(responseData.itemCount);

        } catch (error) {
            console.log("Error while fetching item count");
            console.error(error);
        }
    };
    const fetchExpireCount = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/item/expire", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + `${cookie.get('token')}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch expire count');
            }
    
            const responseData = await response.json();
            console.log("Trying to get expire count");
            console.log(responseData);
    
            // Check if responseData.expireCount is null
            if (responseData.expireCount == null) {
                setExpireCount('0');
            } else {
                setExpireCount(responseData.expireCount);
            }
        } catch (error) {
            console.log("Error while fetching expire count");
            console.error(error);
        }
    };
    
    const fetchData = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/item/list/recadd", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + `${cookie.get('token')}`,
                    'Host': 'api.producthunt.com'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
    
            const responseData = await response.json();
            console.log("Trying to get item data");
            console.log(responseData);
    
            if (responseData.ok && responseData.data) {
                // Extract the item data and set it in state with formatted dates
                const filteredData = responseData.data
                    .filter(item => item.item_name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(item => ({
                        ...item,
                        expiry_date: formatDate(item.expiry_date) // Format date here
                    }))
                    .slice(0, 7); // Limit to 7 items
    
                // Check if the data length is less than 7, and if so, fill with blank data
                const dataWithBlankRows = filteredData.concat(Array(Math.max(0, 7 - filteredData.length)).fill({
                    item_name: '\u00A0',
                    expiry_date: '\u00A0',
                    quantity: '\u00A0'
                }));
    
                setData(dataWithBlankRows);
            } else {
                console.error("Invalid response format from API");
            }
        } catch (error) {
            console.log("Error while fetching data");
            console.error(error);
        }
    };
    

    return (
        <div className="sticky h-[calc(100vh-148px)] overflow-auto bg-[#21253180] rounded-[40px] shadow-[0px_0px_10px_8px_#00000040] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] dark:text-gray-100">
            {/* Dashboard Header */}
            <div className="flex">
                <div className="sticky w-3/5 pt-12 pl-16 font-medium text-4xl text-white">
                    Dashboard
                </div>
                {/* Search box with PNG icons (moved to the left) */}
                <div className="sticky w-2/5 right-0 pt-12 pr-16 flex items-center">
                    <input
                        type="text"
                        placeholder="Search Dashboard..."
                        className="w-full h-full py-1 pl-12 pr-7 rounded-2xl bg-[#40404099] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] dark:text-gray-100  hover:bg-[#41465680] transition-all duration-300 ease-in-out"
                        style={{ color: "white" }} // Set text color to white
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <img
                        src="https://cdn.discordapp.com/attachments/1151835814939078738/1151837859939102720/1f5f8f3eb04b33df710ea2026ec3e432.png" // Replace with the actual path to your PNG icon
                        alt="Search"
                        className="absolute w-6 h-6 left-4 "
                    />
                </div>
            </div>

            {/* Status Box */}
            <div className="flex">
                {/* Total Items */}
                <div className="sticky w-80 2xl:w-1/4 pt-14 pl-16">
                    <div className="sticky w-full h-56 bg-[#142741] rounded-[35px] shadow-[0px_0px_10px_3px_#00000040] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)]">
                        <div className="absolute top-6 left-8 font-medium text-[#a2d7a7] text-[21px]">
                            Total Items
                        </div>
                        <div className="flex w-full h-56 pt-10 justify-center text-medium text-[#a2d7a7] text-[40px] items-center">
                            {/* {itemNumber ?? 'Loading...'} */}
                            {itemCount ?? 'Loading...'}
                        </div>
                    </div>
                </div>
                {/* Expired Soon */}
                <div className="sticky w-80 2xl:w-1/4 pt-14 pl-10 2xl:pl-16">
                    <div className="sticky h-56 bg-[#142741] rounded-[35px] shadow-[0px_0px_10px_3px_#00000040] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)]">
                        <div className="absolute top-6 left-8 font-medium text-[#ff7f78] text-[21px]">
                            Expired Soon
                        </div>
                        <div className="flex w-full h-56 pt-10 justify-center text-medium text-[#ff7f78] text-[40px] items-center">
                            {expireCount ?? 'Loading...'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recently Added */}
            <div className="sticky pt-16 pl-16 font-medium text-[#ffffff] text-3xl">
                Recently Added
            </div>

            {/* Table */}
            <div className="sticky w-full py-8 px-16">
                <div className="sticky h-96 bg-[#142741] rounded-[35px] shadow-[0px_0px_10px_3px_#00000040] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)]">
                    <table className="w-full h-full table-fixed">
                        <thead>
                            <tr className="text-[#ffd8ac] text-[21px]">
                                <th className="pt-4 px-6">Item Name</th>
                                <th className="pt-4 px-6">Expiry Date</th>
                                <th className="pt-4 px-6">Quantity</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {data.map((item, index) => (
                                <tr className="text-[#ffffff] text-[18px]" key={index}>
                                    <td className="py-1 px-6">{item.item_name}</td>
                                    <td className="py-1 px-6">{item.expiry_date}</td>
                                    <td className="py-1 px-6">{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardFrame;
