import React from "react";
import Card from "../../../components/card";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import data from "../component/fakedata/ingredientsdata";
import IngredientCard from "../../../components/ingredientcard";
export default function Ingredients() {
    const ingre = data.map((card,index)=>{
        return <IngredientCard tag ={card.tag} img = {card.img} title={card.title} detail={card.detail} key = {index}/>;
    })

    return (
        <>
            <Navbar/>
            <div className=" px-2  2xl:px-64 xl:px-10 md:px-40 ">
                <div className="text-5xl font-extrabold">
                    <h1>ส่วนผสมและวัตถุดิบ</h1>
                </div>
                <div className=" container mx-auto ">
                    <div className="grid grid-cols-4 ">
                        {ingre}
                    </div>
                </div>
            </div>
            <Footer/>  
        </>
    )
}
