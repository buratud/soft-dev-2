import React from "react";

export default function Likebutton(){
    const Like = () => {
        let imgage = document.getElementById("imgage1");
        if (imgage.src.match('/images/heart.png')) {
            imgage.src = '/images/redheart.png'
        } else {
            imgage.src = '/images/heart.png'
        }
    };
    return (
        <button onClick={Like} className="flex justify-end mt-[20px] hover:underline">
            <img className="h-[36px] w-[36px] mr-2" id="imgage1" src="/images/heart.png" alt="" />
            <h1 className="mt-1 text-lg font-bold">ถูกใจ</h1>
        </button>
    )
};