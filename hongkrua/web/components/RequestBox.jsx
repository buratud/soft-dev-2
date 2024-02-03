import React from "react";
export default function RequestBox(props) {
    const { username, img, userrequest,} = props;
    return (
        <div className="flex mt-3">
            <img src={img} alt="profile" className="h-[64px] w-[64px] rounded-[90px] p-1 border-2 border-black" />
            <div className="text-xl ml-[16px] w-full">
                {username}
                <div className="text-base h-auto border-2 p-2 rounded-md border-black mt-2">
                    {userrequest}
                </div>
            </div>
        </div>
    )
}
