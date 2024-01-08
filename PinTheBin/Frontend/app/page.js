import { LoginBox } from 'app/loginbox';
import Image from 'next/image'


import { NextResponse } from 'next/server'

export default function Home() {

  // instance.interceptors.response.use(function (response) {
  //   return response;
  // }, function (error) {
  //   console.log("kanchu: this is not cute")
  //   router.push('/');
  //   return Promise.reject(error);
  // });
  return (
    <main className="bg-f4f4f4 min-h-screen flex flex-col justify-center items-center">
      <Image
        src={`/static/PinTheBinIcon.png`} alt="PinTheBin" width="256" height="256" className="w-20 pb-4" />
      <LoginBox />
    </main>
  )
}
