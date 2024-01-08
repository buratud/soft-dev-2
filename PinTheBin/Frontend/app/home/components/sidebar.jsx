import React from "react";
import "./style.css";
import { RxExit } from "react-icons/rx";
import { sidebardata } from '../data/sidebardata';
import { useRouter } from 'next/navigation';

export const Sidebar = ({ isSidebarOpen }) => {
  const router = useRouter();
  const destroyToken = () => {
    localStorage.removeItem("token");
    router.push("/");
  }
  return (
    <div className='sidebar bg-f4f4f4'>
      <div className='sidebardata w-60'>
        {/* Profile and Logout*/}
        <div className="pt-6 mb-8 ml-8 mr-8 flex items-center justify-between">
          <RxExit className="hover:scale-105 transition-all cursor-pointer" size={30} onClick={destroyToken} />
          <img className='rounded-full border' src='https://cdn.discordapp.com/icons/1008658885030203422/b698495a36eb9390cdfe46430edbd716.png' alt="Profile" width="40" height="40" />
        </div>

        {sidebardata.map((val, key) => (
          <a
            key={key}
            href={val.link}
            className="cursor-pointer pl-8 hover:scale-105 transition-all font-NotoSansThai text-2xl block mb-2" // Use "block" to make the entire list item clickable
          >
            <span id='title'>{val.title}</span>
          </a>
          ))}
      </div>
    </div>
  );
};
