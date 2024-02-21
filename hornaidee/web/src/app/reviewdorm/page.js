"use client";
import React, { useState } from "react";
import ReactStars from 'react-stars';
import "./style.css";

export default function DormReview() {

  return (
    <div className="container">
      {/* dorm name, address, nearby university */}
      <div className="titlecontainer">
        <div className="title">
          <h1>Review This Dorm</h1>{" "}
          {/* dorm name, address, nearby university */}
        </div>
      </div>

      {/* reviews and ratings */}
      <div className="reviewandrating">

        {/* reviews and ratings */}
        <div className="review">
          <div className="summaryreview">
            <h3>Summarize your experience in a sentence.</h3>
            <textarea
            name="summary"
            placeholder="Your Summary..."
            className="center-textarea"
            cols="70"
            rows="1"
            />
          </div>
          <div className="detailreview">
            <h3>Tell us about your detailed experience.</h3>
            <textarea
            name="summary"
            placeholder="Your Detailed Experience..."
            className="center-textarea"
            cols="70"
            rows="8"
            />
          </div>
        </div>

        {/* ratings */}
        <div className="ratings">
          <div className="startext">
            <h3>Give this property a star.</h3>
            {/* stars logic here */}
            <ReactStars 
            className="stars"
            count={5} 
            size={40} 
            half={false}
            color2={'#ffd700'}/>
          </div>
          <div className="reviewButtonContainer">
          <button className="reviewButton">Review Property</button>{" "}
          {/* hidden unless a owner */}
        </div>
        </div>
  
      </div>
    </div>
  );
}
