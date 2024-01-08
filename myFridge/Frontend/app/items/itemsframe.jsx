'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { headers } from '@/next.config';
var cookie = require('js-cookie')
// Function to format the date
function formatDate(date) {
    const options = { year: 'numeric', day: 'numeric', month: 'short' };
    return new Date(date).toLocaleDateString(undefined, options);
}

export const ItemsFrame = () => {
    const router = useRouter();
    const [sortingCriterion, setSortingCriterion] = useState('name'); // Default sorting by name
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    const handleAdd = () => {
        router.push('/add-items');
    };

    const handleEdit = (item) => {
        const id = item.items_id;
        console.log(id)
        // console.log("Index:::::::::::::::::::::::::::::::::::::::::::::::::::",item)
        // router.push(`/edit-items:${id}`);
        router.push(`/edit-items?id=${id}`);
        // router.push({
        //     pathname: '/edit-items',
        //     query: { id: id }
        // })
    };

    const handleSortChange = (event) => {
        const newSortingCriterion = event.target.value;
        setSortingCriterion(newSortingCriterion);
        // After changing the sorting criterion, re-fetch the data with the new criterion
        fetchData(newSortingCriterion);
    };

    const handleSearchChange = (event) => {
        const newSearchQuery = event.target.value;
        setSearchQuery(newSearchQuery);
        // After changing the search query, re-fetch the data with the new query
        fetchData(sortingCriterion, newSearchQuery);
    };

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchData();
    }, [sortingCriterion, searchQuery]);

    const fetchData = async (sortCriterion = sortingCriterion, search = searchQuery) => {
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
            if (responseData.ok && responseData.data) {
                // Extract the item data and set it in state with formatted dates
                const filteredData = responseData.data
                    .filter(item => item.item_name.toLowerCase().includes(search.toLowerCase()))
                    .map(item => ({
                        ...item,
                        expiry_date: formatDate(item.expiry_date) // Format date here
                    }))

                // Sort the data based on the sorting criterion
                let sortedData = [...filteredData];
                if (sortCriterion === 'expire') {
                    sortedData = sortedData.sort((a, b) => new Date(a.expiry_date) - new Date(b.expiry_date));
                } else if (sortCriterion === 'recently') {
                    sortedData = sortedData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                } else if (sortCriterion === 'qtyup') {
                    sortedData = sortedData.sort((a, b) => a.quantity - b.quantity);
                } else if (sortCriterion === 'qtydown') {
                    sortedData = sortedData.sort((a, b) => b.quantity - a.quantity);
                } else if (sortCriterion === 'name') { // Add this condition for sorting by name
                    sortedData = sortedData.sort((a, b) => a.item_name.localeCompare(b.item_name));
                }

                setItems(sortedData);
            } else {
                console.error("Invalid response format from API");
            }
        } catch (error) {
            console.log('It jumps to error');
            console.log(error);
            setError(error.message);
            setLoading(false);
        }
    };


    return (
        <div className="font-Manrope">
            <div className="sticky h-[calc(100vh-148px)] overflow-auto bg-[#21253180] rounded-[40px] shadow-[0px_0px_10px_8px_#00000040] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] dark:text-gray-100">
                {/* Dashboard Header */}
                <div className="flex">
                    <div className="sticky w-3/5 pt-12 pl-16 font-medium text-4xl text-white">
                        Items
                    </div>

                    {/* Search box with PNG icons (moved to the left) */}
                    <div className="sticky w-2/5 right-0 pt-12 pr-16 flex items-center">
                        <input
                            type="text"
                            placeholder="Search Items..."
                            className="w-full h-full py-1 pl-12 pr-7 rounded-xl bg-[#40404099] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] dark:text-gray-100  hover:bg-[#41465680] transition-all duration-300 ease-in-out"
                            style={{ color: "white" }}
                            value={searchQuery} // Bind input value to searchQuery state
                            onChange={handleSearchChange} // Handle input changes
                        />
                        <img
                            src="https://cdn.discordapp.com/attachments/1151835814939078738/1151837859939102720/1f5f8f3eb04b33df710ea2026ec3e432.png"
                            alt="Search"
                            className="absolute w-6 h-6 left-4 "
                        />
                    </div>
                </div>

                <div className="flex">
                    {/* Sort by drop down */}
                    <div className="w-2/5 pt-16 px-16 text-white text-[20px]">
                        <label htmlFor="sortBy" className="block text-white text-[20px]">
                            Sort by:
                        </label>
                        <select
                            id="sortBy"
                            value={sortingCriterion}
                            onChange={handleSortChange}
                            className="w-full py-3 pl-3 pr-10 mt-1 rounded-xl bg-[#40404099] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] hover:rounded-[15px] dark:text-gray-100 hover:bg-[#41465680] transition-all duration-300 ease-in-out"
                        >
                            <option value="name">Name</option>
                            <option value="expire">Expiry Date</option>
                            <option value="recently">Recently Added</option>
                            <option value="qtyup">Quantity Ascending</option>
                            <option value="qtydown">Quantity Descending</option>
                        </select>
                    </div>
                    {/* Add item button */}
                    <div className="w-3/4 pt-16 px-16 mt-6 flex justify-end">
                        <button
                            className="w-48 h-14 bg-[#0c420c] hover:bg-[#1a3f50] transition-all duration-300 ease-in-out rounded-[10px] flex justify-center items-center focus:outline-none"
                            onClick={() => handleAdd()}
                        >
                            <div className="font-medium text-[#ffffff] text-[21px]">
                                Add Item
                            </div>
                        </button>
                    </div>
                </div>

                {/* Item Lists */}
                <div className="flex flex-wrap">
                    {items.map((item, index) => (
                        <div key={index} className={`w-1/3 pt-10 pb-6 ${index % 3 === 0 ? 'pl-16' : ''} ${index % 3 === 1 ? 'pr-8 pl-8' : ''} ${index % 3 === 2 ? 'pr-16' : ''}`}>
                            <div className="relative w-full h-96 bg-[#142741] rounded-[33px] shadow-[0px_0px_10px_3px_#00000040] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)]">
                                <div className="absolute top-56 ml-10 font-Manrope font-semibold text-white text-[24px] tracking-[0] leading-[normal]">
                                    {item.item_name}
                                </div>
                                <div className="absolute top-64 mt-2 ml-10 font-medium text-white text-[20px] tracking-[0] leading-[normal]">
                                    Expires: {formatDate(item.expiry_date)}
                                </div>
                                <button
                                    className="absolute mb-7 mr-10 right-0 bottom-0 w-14 h-14 bg-[#1d2387] hover:mb-6 hover:mr-9 hover:w-16 hover:h-16 hover:bg-[#571a56] transition-all duration-300 ease-in-out rounded-[10px] flex justify-center items-center"
                                    onClick={() => handleEdit(item)}
                                >
                                    <img
                                        className="w-10 h-10 p-1"
                                        alt="Edit"
                                        src="https://cdn.discordapp.com/attachments/1151835814939078738/1156153038503952454/0d622ecf015f0b97491b26ed4f4d9e38.png?ex=6513eeec&is=65129d6c&hm=6c3d177f07d4df5e0e8914df198e3b1fdf9cc04e5d16a8926b4428e3c51a4bb7&"
                                    />
                                </button>
                                <div className="absolute top-72 mt-7 ml-10 font-normal text-white text-[20px] tracking-[0] leading-[normal]">
                                    Quantities: {item.quantity}
                                </div>
                                <img
                                    className="absolute object-cover px-9 py-4 h-[220px] w-full "
                                    alt={item.name}
                                    src={item.item_picture}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ItemsFrame;
