"use client";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "./style.css"; // Import CSS module for styling

export default function DormDetails() {
  const mockImages = [
    "https://dailyillini.com/wp-content/uploads/2021/08/2560px-Escalante_Dorm_Room.jpeg",
    "https://www.baltimoresun.com/wp-content/uploads/migration/2023/08/30/IFOYMMPS6VB6XAHVTINFPROGXI.jpg?w=620",
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
    <div>
      <div className="title">
        <h1>Dorm Details</h1>
        <h3>99 Soi Centerpoint Pier, Bang Rak, Bangkok, 10500 TH</h3>
      </div>
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
      /* Add more details about the dorm here */
    </div>
  );
}
