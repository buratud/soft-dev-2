import React from "react";
import Image from "next/image";
import Link from "next/link";
import Stars from "./stars";
export default function RequestCard(props) {
    const { title, img, flag, url, rating, ratingCount } = props;
    return (
        <div className="h-[260px] w-[300px] my-5">
            <Link href='#' className="">
                <div className="">
                    <pic >
                        <img className="absolute p-1" src={flag} alt="logo" width={32} height={24} />
                        {/* <img className="h-[200px] w-[300px]" src={img} alt="a" /> */}
                        {img}
                    </pic>

                    <div>
                        <p className=" text-base font-normal mt-1 max-w-max overflow-hidden text-ellipsis whitespace-nowrap">
                            {title}
                        </p>
                        <div className="mt-1 flex">
                            <Stars rating = {0} />
                            <p className="text-sm">{0} rating</p>
                        </div>
                    </div>
                </div>
            </Link>
            <form action="" className="flex w-full justify-end mt-2">
                <button type="" className="py-1 px-4 bg-slate-400 border-2 border-black text-base ">ยืนยัน</button>
                <button type="" className="py-1 px-[24px] bg-red-600 border-2 border-black text-base text-white ml-[16px]">ลบ</button>
            </form>
        </div>

    )
}
