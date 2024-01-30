import React from "react";
import Link from "next/link";
import Stars from "../../../../components/stars";
export default function DessertCard(props) {
    const { title, img, flag, url,rating,ratingCount} = props;
    return (
        <Link href={`/dessertRecipe ${url}`} className="h-[260px] w-[300px] my-6 shadow">
            <div className="">
                <div >
                    <img className="absolute p-1" src={flag} alt="logo" width={32} height={24} />
                    <img class="h-[200px] w-[300px]" src={img} alt="a" />
                </div>

                <con>
                    <p className=" text-base font-normal mt-1 max-w-max overflow-hidden text-ellipsis whitespace-nowrap">
                        {title}
                    </p>
                    <div className="mt-1 flex">
                        <Stars rating ={rating}/>
                        <p className="text-sm">{ratingCount} rating</p>
                    </div>
                </con>
            </div>
        </Link>
    )
}
