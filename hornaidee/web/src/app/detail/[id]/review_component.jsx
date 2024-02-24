// Import useState and useEffect
import { useState, useEffect } from "react";
import { BsStarFill } from "react-icons/bs";

export default function ReviewComponent({ user_id, stars, short_review, review }) {
  return (
    <main className="max-w-60 my-10 flex">
      {/* Picture profile */}
      <div className="flex items-center self-start break-words">
        <div className="rounded-full overflow-hidden w-20 h-20">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="font-bold px-4 w-60">{user_id}</div>
      </div>

      {/* Review */}
      <div className="flex flex-col ml-4">
        {/* Star */}
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <BsStarFill
                key={index}
                className={
                  ratingValue <= stars ? "text-[#E5C000]" : "text-gray-300"
                }
                size={20}
              />
            );
          })}
          <div className="ml-2 text-gray-500 self-center">{stars}</div>
        </div>

        <div className="mt-2 h-0 max-w-[880px] my-4">
          <div className="text-black font-semibold text-lg break-words">
            {short_review}
          </div>
          <div className="text-black pt-2 break-words">{review}</div>
        </div>
      </div>
    </main>
  );
}
