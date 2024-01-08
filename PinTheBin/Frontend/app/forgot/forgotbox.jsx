import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

export const ForgotPasswordBox = () => {
  return (
    <div className='bg-ffffff rounded-xl shadow-lg p-8 w-96 font-NotoSansThai font-medium'>
        <div className="flex items-center justify-between mb-3">
            <a href="/"> <button className="text-xl text-gray-600 focus:outline-none hover:scale-110 transition-all">
                <IoMdArrowRoundBack size={40} /></button></a>
            <h2 className="text-3xl">ลืมรหัสผ่าน</h2>
            <div className="w-8"></div> {/* Add an empty div for spacing */}
        </div>
      {/* <form>
        <div className="mb-4">
          <label htmlFor="email" className="block text-xl text-gray-600">อีเมล</label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-ebebeb rounded-xl focus:outline-none bg-f4f4f4 font-normal"
            placeholder="อีเมล"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full px-4 py-4 mb-3 bg-blue-500 text-xl text-ffffff rounded-xl bg-717171 hover:scale-105 transition-all"
          >
            รีเซ็ตรหัสผ่าน
          </button>
        </div>
      </form> */}
    <div className="mb-4 font-NotoSansThai">
        โปรดติดต่อเจ้าหน้าที่ เพื่อทำการรีเซ็ต
    </div>
    </div>
  );
};
