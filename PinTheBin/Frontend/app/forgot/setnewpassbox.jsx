import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

export const SetNewPasswordBox = () => {
  return (
    <div className='bg-ffffff rounded-xl shadow-lg p-8 w-96 font-NotoSansThai font-medium'>
      <div className="flex items-center justify-between mb-3">
        <a href="/"> <button className="text-xl text-gray-600 focus:outline-none">
          <IoMdArrowRoundBack size={40} /></button></a>
        <h2 className="text-3xl">ตั้งรหัสผ่านใหม่</h2>
        <div className="w-8"></div> {/* Add an empty div for spacing */}
      </div>
      <form>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-xl text-gray-600">รหัสผ่านใหม่</label>
          <input
            type="password"
            id="newPassword"
            className="w-full px-3 py-2 border border-ebebeb rounded-xl focus:outline-none bg-f4f4f4 font-normal"
            placeholder="รหัสผ่านใหม่"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmNewPassword" className="block text-xl text-gray-600">ยืนยันรหัสผ่านใหม่</label>
          <input
            type="password"
            id="confirmNewPassword"
            className="w-full px-3 py-2 border border-ebebeb rounded-xl focus:outline-none bg-f4f4f4 font-normal"
            placeholder="ยืนยันรหัสผ่านใหม่"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full px-4 py-4 mb-3 bg-blue-500 text-xl text-ffffff rounded-xl bg-717171"
          >
            ตั้งรหัสผ่านใหม่
          </button>
        </div>
      </form>
    </div>
  );
};
