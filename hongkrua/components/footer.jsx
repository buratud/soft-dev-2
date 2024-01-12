import React from "react";
import Link from "next/link";
export default function Footer() {
    return (
        <footer className="py-5 bg-black  px-5 2xl:px-64  xl:px-30 : lg:px-10 w-full mt-40">      
            <div className=" flex justify-end">
                <div className="items-end max-w-max">
                    <p className=" text-white items-end">
                        ติดต่อสอบถาม <br />
                        เบอร์โทร : 091-759-1423 <br />
                        Facebook : HONG KRUA <br />
                        Instagram : hong_krua <br />
                        Youtube : Hongkrua <br />
                    </p>
                </div>
            </div>
        </footer>
    )
}
