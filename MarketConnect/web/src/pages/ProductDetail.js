import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaUser, FaMailBulk, FaLine } from "react-icons/fa"; // Importing required icons
import "./ProductDetail.scoped.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios";
import { REACT_APP_BASE_API_URL } from "../config";

const FoodDetail = () => {
  const { foodid } = useParams();
  const [food, setFood] = useState({});
  useEffect(() => {
    axios
      .post(`${REACT_APP_BASE_API_URL}/fooddetail`, {
        foodid: foodid,
      })
      .then(({ data }) => {
        setFood(data[0]);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  useEffect(() => {
    console.log(food);
  }, [food]);
  return (
    <div className="container">
      <NavBar />
      {/* <PopChat messages={[]} /> */}
      <div className="container-box">
        <div className="box">
          {/* card left */}
          <div className="img-box">
            <div className="img-display">
              <div className="img-showcase">
                <img src={food?.URL} alt="" />
              </div>
            </div>
          </div>
          {/* card right */}
          <div className="prodinfo-container">
          <div className="product-content">
            <h2 className="product-title">
              <p>{food?.Food_Name ?? "-"}</p>
            </h2>
            <div className="product-price">
              <p className="last-price">
                {" "}{food?.Price ? `${food.Price.toLocaleString('en-US')}` : "-"} ฿
              </p>
            </div>
            <hr className="separator-line-top"/>
              <div className="product-detail">
                <h2>Contact the seller: </h2>
                <ul>
                  <li>
                    <FaUser /> <p> {food?.users?.username ?? "-"} </p>
                  </li>
                  <li>
                    <FaMailBulk /> <p> {food?.users?.email ?? "-"}</p>
                  </li>
                  <li>
                    <FaLine /> <p> {food?.Line ?? "-"}</p>
                  </li>
                </ul>
                <hr className="separator-line-bottom"/> {/* Separator line */}
                <h2 className="product-info-header-color">Product Info</h2>
                <ct>Category: {food?.MarketConnect_Category?.catagory_name ?? "-"}</ct>
                <de>{food?.Description ?? "-"}</de>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FoodDetail;
