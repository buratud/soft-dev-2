// Import useState and useEffect
import { useState, useEffect } from "react";
import { BsStarFill } from "react-icons/bs";
import axios from "axios";
import Image from "next/image";
import { NEXT_PUBLIC_BASE_API_URL } from "../../../../config";

export default function ReviewComponent({ user_id, stars, short_review, review }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user data
    axios.get(`${NEXT_PUBLIC_BASE_API_URL}/users/${user_id}`)
      .then((res) => {
        console.log("user data: ", res.data);
        setUser(res.data);
        setIsLoading(false);
      });
  }, [user_id]);

  const handleImageError = () => {
    // Handle the error when the image fetch fails (404 error)
    console.log("Image fetch failed, using default image instead.");
    setIsLoading(false); // Set loading to false to render the default image
  };

  return (
    <main className="max-w-60 my-10 flex">
      {/* Picture profile */}
      <div className="flex items-center self-start break-words">
        <div className="rounded-full overflow-hidden w-20 h-20">
          {!isLoading ? (
            <Image
              src={user.picture}
              alt="Avatar"
              className="w-full h-full object-cover"
              width={80}
              height={80}
              onError={handleImageError} // Handle image fetch error
            />
          ) : (
            // Render a default image from the public folder if cannot fetch the image
            <Image
              src="/images/PersonCircle.svg"
              alt="Default Avatar"
              className="w-full h-full object-cover"
              width={80}
              height={80}
            />
          )}
        </div>
        <div className="font-bold px-4 w-60 text-2xl">{user.username}</div>
      </div>

      {/* Review */}
      <div className="flex flex-col ml-4 pt-6 break-words min-w-[880px]">
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
                size={32}
              />
            );
          })}
        </div>

        <div className="mt-2 overflow-y-auto max-w-[880px] my-4">
          <div className="text-black font-semibold text-2xl">
            {short_review}
          </div>
          <div className="text-black pt-2 text-xl">{review}</div>
        </div>
      </div>
    </main>
  );
}
