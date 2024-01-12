import React from "react";
import Card from "../../../components/card";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import data from "../component/fakedata/fooddata";
export default function home() {
    const american = data
    .filter((card) => card.kind === 'อาหารคาว')
    .filter((card) => card.nation === 'US')
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


    return (
        <>
            <Navbar />
            <div className=" px-2 2xl:px-64 xl:px-10 md:px-40 ">
                <div className="text-5xl font-extrabold">
                    <h1>สูตรอาหารอเมริกัน</h1>
                </div>
                <div className=" container mx-auto mt-[24px]">
                    <div className="grid grid-cols-4 ">
                        {american}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
