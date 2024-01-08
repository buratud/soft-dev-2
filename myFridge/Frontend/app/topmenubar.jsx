import React from "react";

export const Topmenubar = () => {
  return (
    <div className="topmenu-container">
      <div className="relative w-full h-[67px]">
        <div className="fixed w-full h-[67px] top-0 left-0 bg-[#21253180]">
          <div className="absolute top-0 left-0 flex items-center w-full h-[67px]">
            {/* logo */}
            <a
                    href="#"

                    className="relative w-16 h-16 pl-10 cursor-pointer"
                >
                    <img
                        src="https://cdn.discordapp.com/attachments/1151835814939078738/1156942482500767834/image__1_-removebg-preview_1.png?ex=6516ce26&is=65157ca6&hm=0414d5fa6ea89ee386e33906c3d3018918b4da22d5157dc8607d0dc9b447b51a&" // Replace with the path to your image
                        alt="myFridge Logo"
                        className="w-full h-full object-contain transition-transform transform scale-125"
                    />
              </a>
          </div>
        </div>
      </div>
    </div>
  );
};