"use client";
import { useSession } from "next-auth/react";

import React from "react";
import "./login.css";
import Image from "next/image";
import { signIn } from "next-auth/react";
import Google from "next-auth/providers/google";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession();
  const token = session?.token;
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,

      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const { token,user } = await response.json();
      console.log("เข้าสู่ระบบสำเร็จ");
      console.log(token);
      console.log(user);
      router.push('/')
      // ทำสิ่งที่คุณต้องการหลังจากเข้าสู่ระบบ เช่น เปลี่ยนหน้าหรือดำเนินการอื่น ๆ
    } else {
      // เข้าสู่ระบบไม่สำเร็จ
      console.error("เข้าสู่ระบบไม่สำเร็จ");
    }
  };

  return (
    <div>
      <section className="flex flex-col md:flex-row h-screen items-center">
        <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
          <img
            src="https://source.unsplash.com/random/?food"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div
          className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
        >
          <div className="w-full h-100">
            <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
              เข้าสู่ระบบ
            </h1>

            <form className="mt-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700">อีเมล</label>
                <input
                  type="email"
                  name="email"
                  placeholder="ระบุอีเมล"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autoFocus
                  autoComplete="off"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">รหัสผ่าน</label>
                <input
                  type="password"
                  name="password"
                  placeholder="ระบุรหัสผ่าน"
                  minLength="6"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="text-right mt-2">
                <a
                  href="#"
                  className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                >
                  ลืมรหัสผ่าน?
                </a>
              </div>

              <button
                type="submit"
                className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
        px-4 py-3 mt-6"
              >
                เข้าสู่ระบบ
              </button>
            </form>

            <div className="flex items-center justify-center">
              <hr className="my-6 border-gray-300 w-full" />
              <span className="px-2 bg-white text-gray-500">หรือ</span>
              <hr className="my-6 border-gray-300 w-full" />
            </div>

            <button
              onClick={() => signIn(Google)}
              type="button"
              className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
            >
              <div className="flex items-center justify-center">
                <Image
                  src="/images/googlelogo.png"
                  alt="googlelogo"
                  width={24}
                  height={24}
                />
                <span className="ml-4">เข้าสู่ระบบ ด้วย Google</span>
              </div>
            </button>

            <p className="mt-8">
              ยังไม่มีบัญชี?{" "}
              <a
                href="#"
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                สร้างบัญชี
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
