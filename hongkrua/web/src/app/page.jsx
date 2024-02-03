'use client'
import React, { useState } from "react";
import Image from "next/image";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Head from "next/head";
import data from "./component/fakedata/fooddata";
import Link from "next/link";
import Card from "../../components/card";

export default function FoodRecipe() {
  
  const [comments, setComments] = useState(""); // สร้าง state เพื่อเก็บข้อมูลที่ผู้ใช้กรอก

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/submitData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comments }), // ส่งข้อมูลในรูปแบบ JSON
      });

      if (response.ok) {
        // ส่งข้อมูลสำเร็จ
        console.log('ส่งข้อมูลสำเร็จ');
        // ทำอย่างอื่นตามต้องการ, เช่น ล้างฟอร์ม
        setComments("");
      } else {
        console.error('เกิดข้อผิดพลาดในการส่งข้อมูล');
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error);
    }
  };

  const all = data
    .sort((a, b) => b.ratingCount - a.ratingCount)
    .slice(0, 4)
    .map((card, index) => {
      if (card.kind === 'อาหารคาว') {
        return (
          <Card
            key={index}
            title={card.title}
            img={card.img}
            flag={card.flag}
            url={`/foodRecipe/${card.tag}`}
            rating={card.rating}
            ratingCount={card.ratingCount}
          />
        );
      } else if (card.kind === 'อาหารหวาน') {
        return (
          <Card
            key={index}
            title={card.title}
            img={card.img}
            flag={card.flag}
            url={`/dessertRecipe/${card.tag}`}
            rating={card.rating}
            ratingCount={card.ratingCount}
          />
        );
      }
      return null; // ถ้าไม่ตรงกับเงื่อนไขใดๆ ให้ return null
    });

  const thai = data
    .filter((card) => card.kind === 'อาหารคาว')
    .filter((card) => card.nation === 'TH')
    .slice(0, 4)
    .map((card, index) => (
      <Card
        key={index}
        title={card.title}
        img={card.img}
        flag={card.flag}
        url={card.tag}
        rating={card.rating}
        ratingCount={card.ratingCount}
      />
    ));

  const japan = data
    .filter((card) => card.kind === 'อาหารคาว')
    .filter((card) => card.nation === 'JP')
    .slice(0, 4)
    .map((card, index) => (
      <Card
        key={index}
        title={card.title}
        img={card.img}
        flag={card.flag}
        url={card.tag}
        rating={card.rating}
        ratingCount={card.ratingCount}
      />
    ));

  const american = data
    .filter((card) => card.kind === 'อาหารคาว')
    .filter((card) => card.nation === 'US')
    .slice(0, 4)
    .map((card, index) => (
      <Card
        key={index}
        title={card.title}
        img={card.img}
        flag={card.flag}
        url={card.tag}
        rating={card.rating}
        ratingCount={card.ratingCount}
      />
    ));

  const dessert = data
    .filter((card) => card.kind === 'อาหารหวาน')
    .slice(0, 4)
    .map((card, index) => (
      <Card
        key={index}
        title={card.title}
        img={card.img}
        flag={card.flag}
        url={`/dessertRecipe/${card.tag}`}
        rating={card.rating}
        ratingCount={card.ratingCount}
      />
    ));

  return (
    <>
      <Head>
        <title>HOME</title>
      </Head>
      <Navbar />
      <div className="px-2  2xl:px-64 xl:px-10 md:px-40 mb-40">
        <div className="mb-16">
          <a href="#" className="lg:flex justify-between xl:justify-center">
            <div >
              <h1 className=" text-red-700 text-3xl  xl:text-7xl font-extrabold underline lg:no-underline text-center lg:text-left">
                หมูกรอบเทวดา หนังฟู เนื้อเปื่อย
              </h1>
              <br />
              <div className="">
                <p className="text-base absolute lg:relative invisible lg:visible ">
                  หมูกรอบหรือที่ใครหลายๆคนเรียกว่าหมูสามชั้นทอดกรอบนับว่าเป็นอาหารที่อยู่คู่ครัว <br />
                  ไทยมานานแล้วตำนานหมูกรอบนั้นก็เชื่อว่ามาจากประเทศจีนโดยสูตรหมูกรอบและ <br />
                  วิธีทำหมูกรอบแบบดั้งเดิมจะใช้การย่างเป็นเวลา 8 ชม.จึงกรอบแต่ในปัจจุบัน <br />
                  วิธีทำหมูกรอบนั้นก็ได้พัฒนาขึ้นมาจนเกิดสูตรหมูกรอบเยอะแยะมากมาย<br />
                  แต่ว่าแต่ละสูตรจะได้หมูกรอบหน้าตาแตกต่างกันขนาดไหน
                </p>
              </div>

            </div>
            <Image src="/images/krob.png" alt="moohkrob" width={549} height={364} />
          </a>
        </div>
        <div className="">
          <div>
            <div className="text-2xl mb-[48px]">
              <div className=" flex mb-4 justify-between font-normal">
                <div className="flex">
                  <span className="pt-2"><Image src="/images/down.png" alt="down1" width={16} height={16} /></span>
                  <h1 className="mx-1">เมนูยอดนิยม</h1>
                </div>
                <div className="flex ">
                  <Link href="/popular" className="mx-1 hover:underline"><h1>ทั้งหมด</h1></Link>
                  <span className="pt-2.5"><Image src="/images/right.png" alt="right1" width={16} height={16} /></span>
                </div>
              </div>

              <div className="flex justify-between">
                {all}
              </div>

            </div>

            <div className="text-2xl mb-[48px]">
              <div className=" flex mb-4 justify-between font-normal">
                <div className="flex">
                  <span className="pt-2"><Image src="/images/down.png" alt="down1" width={16} height={16} /></span>
                  <h1 className="mx-1">อาหารไทย</h1>
                </div>
                <div className="flex">
                  <Link href="/thai" className="mx-1 hover:underline"><h1>ทั้งหมด</h1></Link>
                  <span className="pt-2.5"><Image src="/images/right.png" alt="right1" width={16} height={16} /></span>
                </div>
              </div>

              <div className="flex justify-between">
                {thai}
              </div>

            </div>

            <div className="text-2xl mb-[48px]">
              <div className=" flex mb-4 justify-between font-normal">
                <div className="flex">
                  <span className="pt-2"><Image src="/images/down.png" alt="down1" width={16} height={16} /></span>
                  <h1 className="mx-1">อาหารญี่ปุ่น</h1>
                </div>
                <div className="flex ">
                  <Link href="/japan" className="mx-1 hover:underline"><h1>ทั้งหมด</h1></Link>
                  <span className="pt-2.5"><Image src="/images/right.png" alt="right1" width={16} height={16} /></span>
                </div>
              </div>

              <div className="flex justify-between">
                {japan}
              </div>

            </div>

            <div className="text-2xl mb-[64px]">
              <div className=" flex mb-4 justify-between font-normal">
                <div className="flex">
                  <span className="pt-2"><Image src="/images/down.png" alt="down1" width={16} height={16} /></span>
                  <h1 className="mx-1">อาหารอเมริกัน</h1>
                </div>
                <div className="flex ">
                  <Link href="/american" className="mx-1 hover:underline"><h1>ทั้งหมด</h1></Link>
                  <span className="pt-2.5"><Image src="/images/right.png" alt="right1" width={16} height={16} /></span>
                </div>
              </div>

              <div className="flex justify-between">
                {american}
              </div>

            </div>

            <div className="text-2xl mb-20">
              <div className=" flex mb-4 justify-between font-normal">
                <div className="flex">
                  <span className="pt-2"><Image src="/images/down.png" alt="down1" width={16} height={16} /></span>
                  <h1 className="mx-1">ของหวาน</h1>
                </div>
                <div className="flex ">
                  <Link href="/dessertRecipe" className="mx-1 hover:underline"><h1>ทั้งหมด</h1></Link>
                  <span className="pt-2.5"><Image src="/images/right.png" alt="right1" width={16} height={16} /></span>
                </div>
              </div>

              <div className="flex justify-between">
                {dessert}
              </div>

            </div>

          </div>
        </div>
        {/* comment */}
        <div className=" mt-12">
          <h1 className="text-3xl font-extrabold">ส่งความเห็นหรือเมนูที่ต้องการให้พวกเราเพิ่มลงในเว็บไซต์</h1>

          <div className="w-full flex mt-8">
            <img className="h-[64px] w-[64px] rounded-[90px] p-1 border-2 border-black" src="/images/gfish.png" alt="profilepicture" />
            <div className="flex w-full">
              <div className="flex  mr-6 w-full rounded-[10px]">
                <textarea
                  className="resize-none h-16 w-full rounded-[10px] border-[2px] border-black p-2 ml-[16px]"
                  name="comments"
                  id="comments"
                  placeholder="ต้องการอะไรบอกเราหน่อยสิ..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)} // อัปเดตค่า comments ใน state
                ></textarea>
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="p-3 bg-red-700 rounded-[15px] border-[2px] border-black mr-6 h-[48px] w-[128px] text-white"
              >
                ยืนยัน
              </button>
            </div>
          </div>

          {/* เมื่อยังไม่เข้าสู่ระบบ */}
          <div className="w-full text-center bg-black my-6">
            <h1 className="text-white p-2">ส่งความเห็นหรือเมนูที่ต้องการให้พวกเราเพิ่มลงในเว็บไซต์ได้เมื่อเข้าสู่ระบบ
              <Link href="/login" className="text-red-600 mx-1 underline">คลิกที่นี่เพื่อเข้าสู่ระบบ</Link>
            </h1>
          </div>

          <hr className=" h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
        </div>
      </div>
      <Footer />
    </>
  );
}
