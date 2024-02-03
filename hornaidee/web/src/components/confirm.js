import React from 'react'
import Bt1 from './bt1';
import Bt2 from './bt2';

function Confirm(props) {
    const { status,setStatus,confirm } = props
    if (status){return (
        <div className=' left-0 top-0 fixed w-screen h-screen bg-black bg-opacity-80 py-32'>
            <div className='w-1/2 h-full bg-cream rounded-xl m-auto content-between justify-between flex flex-col'>
                <p className='mt-[10%] text-center font-semibold text-5xl'>ยืนยันการลบหอพักนี้?</p>
                <div className="flex mx-auto w-2/3 justify-between mb-[10%]">
                    <Bt2 Width="150px" Height="50px" onChange={confirm}>ยืนยัน</Bt2>
                    <Bt1 Width="150px" Height="50px" onChange={()=>{setStatus(!status)}}>ยกเลิก</Bt1>
                </div>
            </div>
        </div>
    )}
}

export default Confirm;