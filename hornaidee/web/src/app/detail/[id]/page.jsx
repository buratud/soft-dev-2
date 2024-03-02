"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import {
  FaTimes,
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
import "./overlay.css";
import Footer from "../../footer";
import ReviewComponent from "./review_component";

import {
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_BASE_API_URL,
  NEXT_PUBLIC_BASE_WEB_PATH,
  NEXT_PUBLIC_BASE_WEB_URL,
} from "../../../../config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function DormDetails() {
  const params = useParams();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [data, setData] = useState({}); // [dorm, address, property_number, city, province, zip_code, rent_price, facilities, host, nearby_university
  const [user, setUser] = useState({});
  const [rate, setRate] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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

  const [session, setSession] = useState(null);
  const [user_id, setUser_id] = useState("");
  const [owner_id, setOwner_id] = useState("");
  const [showOverlay, setShowOverlay] = useState(false); // State for overlay visibility
  const [overlayImageIndex, setOverlayImageIndex] = useState(0); // State for the index of image shown in overlay

  useEffect(() => {
    supabase.auth.getSession().then((result) => {
      setSession(result.data.session.user.id);
      // console.log(result.data.session.user.id);
      setUser_id(result.data.session.user.id);
    });
  }, []);

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

  const handleImageClick = (index) => {
    setOverlayImageIndex(index);
    setShowOverlay(true);
  };

  const router = useRouter();
  const handleEditButtonClick = () => {
    router.push(`${NEXT_PUBLIC_BASE_WEB_URL}/edit/${params.id}`);
  };

  useEffect(() => {
    const interval = setInterval(goToNextImage, 5000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    axios.get(`${NEXT_PUBLIC_BASE_API_URL}/dorms/${params.id}`).then((res) => {
      // console.log(res.data);
      setData(res.data);
      // console.log(res.data.owner);
      setOwner_id(res.data.owner); // Update owner_id using setState
      axios
        .get(`${NEXT_PUBLIC_BASE_API_URL}/users/${res.data.owner}`)
        .then((res) => {
          // console.log(res.data);
          setUser(res.data);
          setIsLoading(false);
        });
    });
  }, []);

  useEffect(() => {
    axios.get(`${NEXT_PUBLIC_BASE_API_URL}/dorms/${params.id}/reviews`).then((res) => {
      // console.log(res.data);
      setRate(res.data);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <Image
          alt="logo"
          src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/logo.png`}
          height={70}
          width={80}
          className="loading-image spinning"
        />
      </div>
    );
  }

  const Overlay = () => (
    <div
      className={`overlay ${showOverlay ? "fadeIn" : "fadeOut"}`}
      onClick={() => setShowOverlay(false)}
    >
      <div className="overlayContent">
        <img
          src={data.photos[overlayImageIndex]}
          alt={`Image ${overlayImageIndex + 1}`}
        />
      </div>
    </div>
  );

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
          {/* <div className="address">
            <FaSchool />
            <h3>University Name Here</h3> {/* needs to be dynamically changed
          </div> */}
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
                onClick={() => handleImageClick(currentImageIndex)}
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
              <h3>{rate.average !== null ? rate.average.toFixed(1) : "_._"}</h3>
            </div>
          </div>
          <div className="bigPricebox">
            <h3>THB {data.rent_price}</h3>
            <span>&nbsp;/mo.</span>
          </div>
          {user_id === owner_id ? (
            <div className="editButtonContainer">
               <button className="editButton" onClick={handleEditButtonClick}>
                Edit Property
              </button>
              <button className="deleteButton" onClick={handleEditButtonClick}>
                Delete Property
              </button>
            </div>
          ) : null}
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
              <Image
                src={user.picture}
                alt="Host"
                className="hostavatar"
                style={{width: '100px', height: 'auto'}}
                width={80}
                height={80}
              />
              <div className="hostdetails">
                <h3>{user.username}</h3>
                <div className="contactinfo">
                  <div className="contactrow">
                    <FaMailBulk />
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reviews Component */}
      <div className="reviewsbox">
        <div className="flex justify-between">
          <h3 className="font-semibold">All Reviews</h3>
          {/* Add review button */}
          <div>
              <button
                className="bg-[#092F88] hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-[15px] text-xl mt-2 mb-2 transition-all"
                onClick={() => {
                  router.push(`${NEXT_PUBLIC_BASE_WEB_URL}/review/${params.id}`);
                }}
              >
                Add A Review
              </button>
            </div>
          </div>
        <div>
        {rate.reviews.length === 0 && (
          <p className="text-center font-medium text-xl pt-6">No reviews yet</p>
        )}
        {!isLoading && rate.reviews.map((review, index) => (
          <ReviewComponent
            key={index}
            user_id={review.user_id}
            stars={review.stars}
            short_review={review.short_review}
            review={review.review}
            className=''
          />
        ))}
        </div>
      </div>


      <Footer />
      {showOverlay && <Overlay />}
    </div>
  );
}
