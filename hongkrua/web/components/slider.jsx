import React from "react";
import Link from "next/link";

export default function Slider(props) {
    const {data} = props;

    const slideLeft = () => {
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft - 600;
    };

    const slideRight = () => {
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft + 600;
    };

    return (
        <div className=" mt-12">
            <h1 className="text-3xl font-extrabold">ส่วนผสมต่างๆ</h1>
            <div className="relative flex items-center">
                <button onClick={slideLeft} className="p-5 hover:bg-gray-300 rounded-[90px]">
                    <img className="h-[24px]" src="/images/sort-left.png" alt="left" />
                </button>
                <div id="slider" className="w-full overflow-x-scroll scroll whitespace-nowrap mx-2 scroll-smooth scrollbar-hide flex">
                    {data.map((card,index) => (
                        <Link href={card.tag} key={index} className="hover:shadow hover:border-2 rounded-3xl p-3 mt-4 mx-3">
                            <div className="w-64 h-48 my-7  ">
                                <pic >
                                    <img className="max-h-36 ml-auto mr-auto" src={card.img} alt="a" />
                                </pic>

                                <con>
                                    <p className=" text-base font-normal mt-1 max-w-max overflow-hidden h-12">
                                        {card.title}
                                    </p>
                                    <div className="mt-1 text-red-700 text-base font-bold">
                                        <p className="">{card.detail}</p>
                                    </div>
                                </con>
                            </div>
                        </Link>
                    ))}
                </div>
                <button onClick={slideRight} className="p-5 hover:bg-gray-300 rounded-[90px]">
                    <img className="h-[24px] " src="/images/sort-right.png" alt="right" />
                </button>
            </div>
        </div>
    )
}
