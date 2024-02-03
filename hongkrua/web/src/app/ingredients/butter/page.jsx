import React from "react";
import Navbar from "../../../../components/navbar";
import Footer from "../../../../components/footer";
import { ingredient,ingredientDetail,ingredientSource } from "./data";
import Link from "next/link";

export default function home() {
    const ingredientDetails = ingredientDetail.map((data, index) => {
        return (
          <li className="mt-1 ml-5 text-base" key={index}>
            {data.detail}
          </li>
        );
      });
      

    const ingredientSources = ingredientSource.map((data,index)=>(
        <div key ={index} className="flex w-[480px] my-[24px] justify-between">
            <img src={data.logo} alt={data.source} className="h-[48px] w-auto"/>
            <div className="flex text-xl font-semibold">
                <p className="mr-[48px] mt-[12px]">{data.price}</p>
                <Link href={data.url} className="rounded-md border-2 border-black py-2 bg-red-600 text-white px-[24px]">
                    <h1>ไปยังร้านค้า</h1>
                </Link>
            </div>
        </div>
    ));


    return (
        <>
            <Navbar/>
            <div className=" px-2  2xl:px-64 xl:px-10 md:px-40 ">
                <div className="grid grid-cols-2">
                    <img src={ingredient.img} alt={ingredient.title} className="w-[300px] h-auto"/>
                    <div className="text-3xl font-extrabold">
                        <h1>{ingredient.title}</h1>
                        <div className="mt-[48px]">
                            {ingredientSources}
                        </div>
                    </div>
                </div>
                <div >
                    <h1 className="text-3xl font-extrabold my-3">รายละเอียดสินค้า</h1>
                    <ul className="mb-[256px] list-disc">
                        {ingredientDetails}
                    </ul>
                </div>    
            </div>
            <Footer/>  
        </>
    )
}

// {shop.map(shop =>(
//     <div className="mt-6 text-lg flex justify-between w-[450px] font-normal">
//     <img src={shop.img} alt={shop.alt} className="h-[64px] w-auto"/>
//     <div className=" flex">
//         <p className="mt-4 mr-6">{shop.price}</p>
//         <div className="mt-4">
//             <Link href={shop.ref} className="px-3 py-2 bg-red-700 text-white rounded-xl border-[2px] border-black">ไปยังร้านค้า</Link>
//         </div>
//     </div> 
// </div>
// ))}