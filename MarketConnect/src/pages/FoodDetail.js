import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./FoodDetail.scoped.css";
import NavBar from "../components/NavBar";
import { PopChat } from "../components/PopChat";
import axios from "axios";

const FoodDetail = () => {
  const { foodid } = useParams();
  const [food, setFood] = useState({});
  useEffect(() => {
    axios
      .post("http://localhost:3200/fooddetail", {
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
          <div className="product-content">
            <h2 className="product-title">
              <p>{food?.Food_Name ?? "-"}</p>
            </h2>
            <div className="product-price">
              <p className="last-price">
                Price :{" "}{" "}{food?.Price ?? "-"} ฿
              </p>
            </div>
            <div className="product-detail">
              <h2>About Food: </h2>
              <p>{food?.Description ?? "-"}</p>
              <ul>
                <li>
                  Category: <p>{food?.Catagory?.catagory_name ?? "-"}</p>
                </li>
                <li>
                  Name:{" "}
                  <p>
                    {food?.User?.firstname ?? "-"} {food?.User?.lastname ?? "-"}
                  </p>
                </li>
                <li>
                  Contact: <p>{food?.User?.contact ?? "-"}</p>
                </li>
                <li>
                  Line: <p>{food?.Line ?? "-"}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;
