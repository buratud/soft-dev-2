"use client";
import React, { useState, useEffect } from "react";
import {
  FaSpinner,
  FaMapPin,
  FaSchool,
  FaChevronLeft,
  FaChevronRight,
  FaMailBulk,
  FaWifi,
  FaPaw,
  FaBus,
  FaUtensils,
  FaShoppingBag,
  FaSnowflake,
  FaAccessibleIcon,
} from "react-icons/fa";
import { MdElevator } from "react-icons/md";
import { IoLogoNoSmoking, IoIosFitness } from "react-icons/io";
import "./style.css";
import Image from 'next/image'
import { NEXT_PUBLIC_BASE_API_URL, NEXT_PUBLIC_BASE_WEB_PATH } from "../../../../config";
import axios from "axios";
import { useParams } from "next/navigation";

export default function DormDetails() {
  const params = useParams();
  

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [data, setData] = useState({}); // [dorm, address, property_number, city, province, zip_code, rent_price, facilities, host, nearby_university
  const [user, setUser] = useState({}); 
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const falicititesIconMap = {
    1: <IoLogoNoSmoking />,
    2: <IoIosFitness />,
    3: <FaSnowflake />,
    4: <FaPaw />,
    5: <FaWifi />,
    6: <MdElevator />,
    7: <FaBus />,
    8: <FaShoppingBag />,
    9: <FaUtensils />,
    10: <FaAccessibleIcon />,
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === data.photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? data.photos.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(goToNextImage, 5000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    axios.get(`${NEXT_PUBLIC_BASE_API_URL}/dorms/${params.id}`).then((res) => {
      console.log(res.data);
      setData(res.data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const owner = data.owner;
    axios.get(`${NEXT_PUBLIC_BASE_API_URL}/users/${owner}`).then((res) => {
      console.log(res.data);
      setUser(res.data);
      setIsLoadingUser(false);
    });
  }, [data]);

  if (isLoading && isLoadingUser) {
    return (
      <div className="loading-container">
        <Image alt="logo" src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/logo.png`} height={70} width={80} className="loading-image spinning" />
      </div>
    );
  }

  return (
    <div className="container">
      {/* dorm name, address, nearby university */}
      <div className="titlecontainer">
        <div className="title">
          <h1>{data.name}</h1>
          <div className="address">
            <FaMapPin />
            <h3>
              {data.address} {data.property_number} {data.city} {data.province}{" "}
              {data.zip_code}
            </h3>
          </div>
          <div className="address">
            <FaSchool />
            <h3>University Name Here</h3>
            {/* needs to be dynamically changed */}
          </div>
        </div>
      </div>

      {/* carousel */}
      <div className="carouselcontainer">
        <div className="carousel">
          {data.photos.length > 0 && (
            <div className="imageContainer">
              <img
                className="carouselImage"
                src={data.photos[currentImageIndex]}
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

        {/* ratings and price */}
        <div className="RateandPricebox">
          <div className="bigRatingbox">
            <h3>Overall Rating</h3>
            <div className="ratingnumbox">
              <h3>-.-</h3> {/* needs to be dynamically changed */}
            </div>
          </div>
          <div className="bigPricebox">
            <h3>THB {data.rent_price}</h3>
            <span>&nbsp;/mo.</span>
          </div>
          <div className="editButtonContainer">
            <button className="editButton">Edit Property</button>{" "}
            {/* hidden unless a owner */}
          </div>
        </div>
      </div>

      {/* facilities and hosts */}
      <div className="facilitiesandhost">
        <div className="facilitiesbox">
          <h3>Most Popular Facilities</h3>
          <div className="facilitieslist">
            {data.facilities.map((facility) => (
              <div className="facilitieslistrow" key={facility.id}>
                {falicititesIconMap[facility.id]}
                <span>{facility.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hostbox">
          <h3>Hosted By</h3>
          <div className="hostinfo">
            <div className="hostprofile">
              <img
                src={user.picture}
                alt="Host"
                className="hostavatar"
              />
              <div className="hostdetails">
                <h3>{user.username}</h3>
                <div className="contactinfo">
                  <div className="contactrow">
                    <FaMailBulk/>
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
