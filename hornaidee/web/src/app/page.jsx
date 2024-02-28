"use client";

import CardDorm from "../../components/CardDorm";
import CardDorm_home from "../../components/CardDorm_home";
import Recent_review from "../../components/Recent_review";
export default function Home() {
  return (
    <main>
      <div style={{padding:'100px',marginTop:'50px',display:'flex',justifyContent:'space-around'}}>
      <Recent_review/>
      <Recent_review/>
      </div>
      
    </main>
  );
}
