"use client";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./style.css"; // Import CSS module for styling

export default function DormDetails() {

  const mockImages = [
    "https://dailyillini.com/wp-content/uploads/2021/08/2560px-Escalante_Dorm_Room.jpeg",
    "https://www.baltimoresun.com/wp-content/uploads/migration/2023/08/30/IFOYMMPS6VB6XAHVTINFPROGXI.jpg?w=620",
    "https://cdn.vox-cdn.com/thumbor/z2M_XZXuk2EK-oIBbPXCVizxN80=/0x0:6492x4328/1200x675/filters:focal(2727x1645:3765x2683)/cdn.vox-cdn.com/uploads/chorus_image/image/69720403/13_THURSDAY_020.0.jpg",
    "https://www.michigandaily.com/wp-content/uploads/2022/02/online_jeh.opinion.Dormroom.02.22.22.0105.jpg",
    // Add more mock image URLs as needed
  ];

  const [images] = useState(mockImages);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="container">
      <div className="titlecontainer">
        <div className="title">
          <h1>Dorm Details</h1>
          <h3>99 Soi Centerpoint Pier, Bang Rak, Bangkok, 10500 TH</h3>
        </div>
      </div>

      <div className="carouselcontainer">
        <div className="carousel">
          {images.length > 0 && (
            <div className="imageContainer">
              <img
                className="carouselImage"
                src={images[currentImageIndex]}
                alt={`Image ${currentImageIndex + 1}`}
              />
              <button className="previousButton" onClick={goToPreviousImage}>
                <FaChevronLeft />
              </button>
              <button className="nextButton" onClick={goToNextImage}>
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>

        <div className="RateandPricebox">
          <div className="bigRatingbox">
            <h3>Overall Rating</h3>
            <div className="ratingnumbox">
              <h3>5.0</h3>
            </div>
          </div>
          <div className="bigPricebox">
            <h3>THB</h3>
            <h3>3,500</h3>
            <l1>/mo.</l1>
          </div>
        </div>
      </div>

      <div className="facilitiesandhost">
        <div className="facilitiesbox">
          <h3>Most Popular Facilities</h3>
          <div className="facilitieslist">
            <ul>
              <li>Wifi</li>
              <li>Laundry</li>
              <li>Security</li>
              <li>24/7 Reception</li>
            </ul>
          </div>
        </div>
        <div className="hostbox">
          <h3>Hosted by</h3>
          <div className="hostinfo">
            <img
              src="https://www.freeiconspng.com/thumbs/msn-icon/msn-icon-16.png"
              alt="host"
            />
            <h3>John Doe</h3>
            </div>
          </div>
      </div>
    </div>
  );
}
