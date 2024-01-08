import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
var cookie = require('js-cookie')

export const Sidebar = ({handleLogoutAction}) => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

    useEffect(() => {
      fetchUserData()
  },[]);


  const handleLogout = () => {
    // Call the handleLogoutAction function to handle the "logout" action
    handleLogoutAction();
  };
  const handleDashboard = () => {
    // Redirect to the dashboard page
    router.push('/dashboard');
  };
  const handleItems = () => {
    // Redirect to the items page
    router.push('/items');
  };
  const handleAppSettings = () => {
    // Redirect to the app-settings page
    router.push('/app-settings');
  };
  const handleAccountSettings = () => {
    // Redirect to the account-settings page
    router.push('/account-settings');
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
            throw new Error('Failed to fetch expire count');
        }

        const responseData = await response.json();
        console.log("Trying to get expire count");
        console.log(responseData);
        setUserData(responseData.userData);

    } catch (error) {
        console.log("Error while fetching UserData");
        console.error(error);
    }
};
  
  return (
      <div className="sticky h-[calc(100vh-148px)] overflow-auto bg-[#21253180] rounded-[40px] shadow-[0px_0px_10px_8px_#00000040] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)] dark:text-gray-100">
        {/* class picture */}
        <div className="flex items-center p-11">
          <img
              src="https://media.discordapp.net/attachments/1151835814939078738/1151836796276199434/imp-profilepic.png?width=412&height=412"
              alt=""
              className="rounded-full w-20 h-20 dark:bg-gray-500"
          />
          {/* class name */}
          <div className='pl-6'>
            <h2 className="font-semibold text-2xl 2xl:text-3xl" style={{ color: "white" }}>
              👋 Hello!
            </h2>
            <span className="flex items-center pt-1 space-x-1 uppercase text-base">
            <a
                rel="noopener noreferrer"
                href="#"
                className="hover:underline dark:text-gray-400"
                style={{ color: "white" }} // Set text color to white
                onClick={handleAccountSettings} // Add onClick handler for Account Settings
            >
              {userData?.display_name ?? 'Loading...'}
            </a>
          </span>
          </div>
        </div>
        <div className="pl-11 pr-11 pb-11 divide-gray-700">
          <ul className="pt-2 pb-4 space-y-1 text-base">
            {/* Sidebar links */}
            <li className="dark:text-red-300">
              <a
                  rel="noopener noreferrer"
                  href="#"
                  className="flex items-center px-2 py-3 space-x-3 rounded-md hover:px-4 hover:bg-gray-700 hover:text-white transition-all duration-300 ease-in-out"
                  onClick={handleDashboard} // Add onClick handler for Dashboard
              >
                <img
                    src="https://cdn.discordapp.com/attachments/1151835814939078738/1151836794879496272/icon-dashboard.png"
                    viewBox="0 0 512 512"
                    className="w-7 h-7 fill-current dark:text-gray-400"
                >
                  {/* Your PNG path here for Dashboard */}
                </img>
                <span className="text-xl" style={{ color: "white" }}> Dashboard</span>
              </a>
            </li>
            <li>
              <a
                  rel="noopener noreferrer"
                  href="#"
                  className="flex items-center px-2 py-3 space-x-3 rounded-md hover:px-4 hover:bg-gray-700 hover:text-white transition-all duration-300 ease-in-out"
                  onClick={handleItems} // Add onClick handler for Items              
              >
                <img
                    src="https://cdn.discordapp.com/attachments/1151835814939078738/1151836795110170726/icon-items.png"
                    viewBox="0 0 512 512"
                    className="w-7 h-7 fill-current dark:text-gray-400"
                >
                  {/* Your PNG path here for Items */}
                </img>
                <span className="text-xl" style={{ color: "#E59393" }}> Items</span>
              </a>
            </li>
            <li>
              <a
                  rel="noopener noreferrer"
                  href="#"
                  className="flex items-center px-2 py-3 space-x-3 rounded-md hover:px-4 hover:bg-gray-700 hover:text-white transition-all duration-300 ease-in-out"
                  onClick={handleAppSettings} // Add onClick handler for App Settings 
              >
                <img
                    src="https://cdn.discordapp.com/attachments/1151835814939078738/1151836795366019152/icon-settings.png"
                    viewBox="0 0 512 512"
                    className="w-7 h-7 fill-current dark:text-gray-400"
                >
                  {/* Your PNG path here for App Settings*/}
                </img>
                <span className="text-xl" style={{ color: "white" }}>
                App Settings
              </span>
              </a>
            </li>
          </ul>
          <ul className="absolute bottom-0 pb-8 space-y-10 text-base">
            {/* Additional links */}
            <li>
              <a
                  rel="noopener noreferrer"
                  href="#"
                  className="flex items-center px-2 py-3 space-x-3 rounded-md hover:px-4 hover:bg-red-950 hover:text-white transition-all duration-300 ease-in-out"
                  onClick={handleLogout} // Add onClick handler for logout
              >
                <img
                    src="https://cdn.discordapp.com/attachments/1151835814939078738/1151836795621888080/icon-signout.png"
                    viewBox="0 0 512 512"
                    className="w-7 h-7 fill-current dark:text-gray-400"
                >
                  {/* Your PNG path here for Logout */}
                </img>
                <span className="text-xl" style={{ color: "white" }}> Sign Out</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
  );
};

export default Sidebar;
