import React from "react";
import Link from "next/link";
export default function IngredientCard(props){
    const {tag, img , title, detail} = props;
    return(
        <Link href={tag} className="hover:shadow-xl border-2 rounded-3xl p-3 mt-4 mx-3">
          <div className="w-64 h-48 my-7">
            <div >
                <img src={img} alt="a" class="max-h-36 ml-auto mr-auto" />
            </div>
            <con>
                <p className=" text-base font-normal mt-1 max-w-max overflow-hidden h-12"> 
                    {title} 
                </p>
                <div className="mt-1 text-red-700 text-base font-bold">
                    <p className="">{detail}</p>
                </div>
            </con>
        </div> 
        </Link>
    )
}