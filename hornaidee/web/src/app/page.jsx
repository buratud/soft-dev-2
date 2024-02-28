"use client";

import CardDorm from "../../components/CardDorm";
import CardDorm_home from "../../components/CardDorm_home";
import Recent_review from "../../components/Recent_review";
export default function Home() {
  return (
    <main>
      <div style={{padding:'50px',marginTop:'50px',display:'flex',justifyContent:'space-around'}}>
      <Recent_review
        img="https://upload.wikimedia.org/wikipedia/commons/8/84/Sharp_Hall_Dorm_Room.jpg"
        dorm_name="test1"
        review="so good!?"
        id={1}
        star="4.5"
      />
      <Recent_review
        img="https://storage.googleapis.com/afs-prod/media/e7b683addae3433cbe6b800a12d8ba44/2500.jpeg"
        dorm_name="Sodsai Dorm"
        review="“Security 24/7 with access to famous convenience store”"
        id={1}
        star="5"
      />
      </div>
      
    </main>
  );
}
