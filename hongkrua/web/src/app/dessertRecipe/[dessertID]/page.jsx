'use client'
import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../../components/navbar";
import Footer from "../../../../components/footer";
import Link from "next/link";
import { ontherusers, usercomment } from "../../../../pages/kawin/comment";
import Box from "../../../../components/commentbox";
import Slider from "../../../../components/slider";
import { foodIngredients, food, cookingSteps } from "../../../../pages/kawin/data";
import Likebutton from "../../../../components/likebutton";
import StarRating from "../../../../components/StarsRating";

function RecipePage() {



  const othercomment = ontherusers.map((data, index) => (
    <Box key={index} username={data.username} img={data.img} usercomment={data.usercomment} rating={data.rating} />
  ));

  const Howtodoit = cookingSteps.map((data, index) => (
    <div key={index}>
      <h1 className="text-base mt-4 mb-2">{`${index + 1}. ${data.step}`}</h1>
      <div className="grid grid-cols-2 justify-center">
        <img className="h-64 w-auto" src={data.img1} alt={`step${index + 1}`} />
        <img className="h-64 w-auto" src={data.img2} alt={`step${index + 1}`} />
      </div>
    </div>
  ));

  const ingredient = foodIngredients.map((ingredient, index) => (
    <li key={index} className="text-base">
      {ingredient.ingre}
    </li>
  ));
    return (
        <>
            <Navbar />
            <div className="2xl:px-64 xl:px-10 md:px-40 ">

                <div className="grid grid-cols-2 ">
                    <img className="max-w-lg p-1" src={food.img} alt="บราวนี่" />
                    <div className="w-96">
                        <h1 className="text-6xl font-extrabold text-red-700">
                            {food.foodName}
                        </h1>
                        <p className="mt-2">
                            {food.foodDetail}
                        </p>
                        <Likebutton className="buttom-0" />
                    </div>
                </div>

                <div className="my-12">
                    <h1 className="text-3xl font-extrabold">ส่วนผสม</h1>
                    <ul className="mt-1 list-disc ml-5">
                        {ingredient}
                    </ul>
                </div>

                <div className="my-12">
                    <h1 className="text-3xl font-extrabold">ขั้นตอนการทำ</h1>
                    <div>
                        {Howtodoit}
                    </div>
                    <img src={food.completeimg} alt={food.foodName} className="mt-[24px]" />

                </div>


                {/* comment */}
                <div className=" mt-12">
                    <h1 className="text-3xl font-extrabold">ความคิดเห็น</h1>
                    
                    {/* แสดงเมื่อLogin */}
                    <div className="w-full flex mt-8">
                        <img className="h-[48px] w-[48px] rounded-[90px] border-[2px] border-black mr-6 p-1" src={usercomment.profileimg} alt="profilepicture" />
                        <form action="/html/tags/html_form_tag_action.cfm" method="post" className="w-full">
                            <div className="flex w-full">
                                <div className="flex  mr-6 w-full rounded-[10px]">
                                <textarea className="resize-none h-16 w-full rounded-[10px] border-[2px] border-black p-2" name="comments" id="comments" placeholder="แสดงความคิดเห็นอะไรสักอย่างสิ">
                                </textarea>
                            </div>
                            <button type="submit" value="Submit" className="p-3 bg-red-700 rounded-[15px] border-[2px] border-black mr-6 h-[48px] w-[128px] text-white">
                                ยืนยัน
                            </button>
                            </div>
                            <div className="flex">
                                <h1 className="mt-[5px]">ให้คะแนน:</h1>
                                <StarRating/>
                            </div>
                        </form>
                    </div>
                    

                    <div className="w-full text-center bg-black my-6">
                        <h1 className="text-white p-2">คุณสามารถแสดงความคิดเห็นได้เมื่อเข้าสู่ระบบ
                            <Link href="/login" className="text-red-600 mx-1 underline">คลิกที่นี่เพื่อเข้าสู่ระบบ</Link>
                        </h1>
                    </div>

                    <hr className=" h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
                    {othercomment}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default RecipePage;


