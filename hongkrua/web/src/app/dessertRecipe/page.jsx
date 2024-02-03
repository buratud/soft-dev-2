import React from "react";
import Card from "../../../components/card";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import data from "../component/fakedata/fooddata";
export default function home() {
    const food = data
    .filter((card) => card.kind === 'อาหารหวาน')
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
            <Navbar/>
            <div className=" px-2  2xl:px-64 xl:px-10 md:px-40 ">
                <div className="text-5xl font-extrabold">
                    <h1>สูตรของหวาน</h1>
                </div>
                <div className=" container mx-auto mt-[24px]">
                    <div className="grid grid-cols-4 ">
                        {food}
                    </div>
            </div>
            
            </div>
            <Footer/>  
        </>
    )
}
