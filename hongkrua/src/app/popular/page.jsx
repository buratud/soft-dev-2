import React from "react";
import Card from "../../../components/card";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import data from "../component/fakedata/fooddata";
export default function home() {
    const all = data
    .sort((a, b) => b.ratingCount - a.ratingCount)
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
    
    return (
        <>
            <Navbar />
            <div className=" px-2 2xl:px-64 xl:px-10 md:px-40 ">
                <div className="text-5xl font-extrabold">
                    <h1>สูตรอาหารยอดนิยม</h1>
                </div>
                <div className=" container mx-auto mt-[24px]">
                    <div className="grid grid-cols-4 ">
                        {all}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
