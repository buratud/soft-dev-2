import React from "react";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import data from "./fakeuserdata";

export default function home() {
    
    return (
        <>
            <Navbar/>
            <div className=" px-2  2xl:px-64 xl:px-10 md:px-40 mb-[232px]">
                <div className="grid grid-cols-2">
                    <img src={data.propic} alt="เนย" className="w-[300px] h-auto"/>
                    <div className="text-3xl font-extrabold">
                        <h1>ข้อมูลผู้ใช้</h1>
                        <div className="mt-6 text-xl">
                            <div className="flex my-6"><h1 className="mr-5">ชื่อผู้ใช้:</h1><h1>{data.username}</h1></div>
                            <div className="flex"><h1 className="mr-5">อีเมล:</h1><h1>{data.email}</h1></div>
                            <form action="" className="mt-[24px]">
                                <button className="py-3 px-[24px] bg-red-700 text-white rounded-md border-2 border-black">Logout</button>
                            </form>
                        </div>
                        <div className="mt-[48px]">
                        </div>
                    </div>
                </div>
                <div class="max-w-sm mt-8 ">
                    <label for="photobutton" class="text-xs font-medium text-gray-500">เปลี่ยนรูปโปรไฟล์</label>
                    <div class="relative z-0 mt-0.5 flex w-full -space-x-px">
                        <input id="photobutton" type="file" class="block w-full cursor-pointer appearance-none rounded-l-md border border-gray-200 bg-white px-3 py-2 text-sm transition focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"/>
                        <button type="submit" class="inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded-r border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 transition hover:border-gray-300 hover:bg-gray-100 focus:z-10 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300">Save</button>
                    </div>
                </div>  
            </div>
            <Footer/>  
        </>
    )
}
