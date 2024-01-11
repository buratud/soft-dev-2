'use client'
import React from "react"

export default function Stars(props){
  const { rating} = props;

  // คำนวณจำนวนดาวเต็มและครึ่งดาว
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  // สร้าง JSX ของดาว
  const starElements = [];
  for (let i = 0; i < fullStars; i++) {
    starElements.push(<img key={i} src="/images/full.png" alt="fullStar" className="h-[18px] w-[18px]" />);
  }
  if (halfStar) {
    starElements.push(<img key="half" src="/images/half.png" alt="halfStar" className="h-[18px] w-[18px]" />);
  }
  for (let i = 0; i < emptyStars; i++) {
    starElements.push(<img key={`empty-${i}`} src="/images/empty.png" alt="emptyStar" className="h-[18px] w-[18px]" />);
  }

  return (
      <ul className="flex mr-1">
        <li className="flex">{starElements}</li>
      </ul>
  );
}