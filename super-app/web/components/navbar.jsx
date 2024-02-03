import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="py-5 bg-black shadow flex justify-between px-0 2xl:px-64  xl:px-30 : lg:px-10 w-full mb-20" >
            <div className="lg:flex ">
                <span>
                    <Link href="/"><Image className="lg:mr-6 mr-2 pl-2" src ="/images/icon.png" alt = "logo" width={100} height={100}/></Link>
                </span>
                <div className="">
                    <ul className=" mt-5 lg:mr-3 bg-black lg:bg-transparent lg:flex  w-full text-center shadow space-x-4 lg:text-center absolute lg:max-w-max">
                        <br />
                        <li><Link className="text-white text-xl " href="/foodRecipe">สูตรอาหาร</Link></li>
                        <li><Link className="text-white text-xl " href="/dessertRecipe">สูตรขนม</Link></li>
                        <li><Link className="text-white text-xl " href="/ingredients">ส่วนผสมและวัตถุดิบ</Link></li>
                        <li><Link className="text-white text-xl " href="/like">สูตรอาหารที่ถูกใจ</Link></li>
                        <li><Link className="text-white text-xl " href="/addnewmenu">เขียนสูตรอาหาร</Link></li>
                        <li><Link className="text-white text-xl " href="/checkrequest">ตรวจสอบรีเควส</Link></li>
                        <li><Link className="text-white text-xl " href="/checkrequestfornewmenu">ตรวจสอบสูตรอาหาร</Link></li>
                        <br/>
                    </ul>
                </div>
                
            </div>

            <div >
                <ul className="flex ">  
                    <li>
                        <form className="flex p-2 bg-white  h-11 rounded-3xl mr-2 mt-2">
                            <input className ="outline-none bg-transparent" type="text" placeholder="ค้นหาสิ่งที่คุณต้องการ..."/>
                            <button className="" type="submit"><Image src ="/images/icons8-search-50.png" alt = "logo" width={25} height={25}/></button>
                        </form>
                    </li>
                    <li className=" flex pt-3 mt-2">
                        <Link href="/login" className="text-white bg-transparent text-xl flex "> 
                        <span className="mx-1"><Image src ="/images/icons8-human-64.png" alt = "logo"  width={25} height={25}/></span>
                        ลงชื่อเข้าใช้
                        </Link> 
                    </li>
                </ul>
            </div>      
        </nav>
        
    )
}
