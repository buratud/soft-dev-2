import React from "react";
import Image from "next/image";
import Link from "next/link";
import Stars from "./stars";
export default function Card(props) {
    const { title, img, flag, url,rating,ratingCount} = props;
    return (
        <div className="h-[280px] w-[300px] mb-4">
            <Link href={url} className="h-[260px] w-[300px] mb-4">
            <div className="">
                <pic >
                    <img className="absolute p-1" src={flag} alt="logo" width={32} height={24} />
                    <img className="h-[200px] w-[300px]" src={img} alt="a" />
                </pic>

                <div>
                    <p className=" text-base font-normal mt-1 max-w-max overflow-hidden text-ellipsis whitespace-nowrap">
                        {title}
                    </p>
                    <div className="mt-1 flex">
                        <Stars rating ={rating}/>
                        <p className="text-sm">{ratingCount} rating</p>
                    </div>
                </div>
            </div>
        </Link>
        <form action="" className="flex w-full justify-end">
            <button type = "" className="py-1 px-4 bg-red-600 border-2 border-black text-base text-white">ลบ</button>
        </form>
        </div>
        
        
    )
}
