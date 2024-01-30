"use client";
import React, { useState, useEffect } from "react";
import RequestCard from "../../../components/requestcard";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import {baseApiUrl} from '../../../config' 

export default function Home() {
  const [foodData, setFoodData] = useState([]);
  const { data: session, status } = useSession()
  const router = useRouter()
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${baseApiUrl}/api/recipes`);
        if (response.ok) {
          const data = await response.json();
          setFoodData(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error(error);
      }

    }

    fetchData();
  }, []);

  const food = foodData?.map(
    (recipes, index) => (
      (
        <RequestCard
          key={index}
          title={recipes.title}
          img={
            <img
              src={recipes.selectedImage} // แทรก Base64 ลงใน data URI
              alt={recipes.title}
              onError={(e) => console.error("Image load error:", e)}
            />
          }
          flag={recipes.nation}
        />
      )
    )
  );
  useEffect(()=>{
    console.log(session)

    if (session){
      console.log(session.user.email)
      if (session.user.email !== 'kasidit100@gmail.com'){
        router.push('/')
      }
    }
  },[session])
  
  return (
    <>
      <Navbar />
      <div className="px-2 2xl:px-64 xl:px-10 md:px-40">
        <div className="text-5xl font-extrabold">
          <h1>สูตรอาหาร</h1>
        </div>
        <div className="container mx-auto mt-[24px]">
          <div className="grid grid-cols-4 ">{food}</div>
        </div>
      </div>
      <Footer />
    </>
  );
}
