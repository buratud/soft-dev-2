"use client";

import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";

import "./style.css";

export default function ContactSupport() {
  const [feedbackData, setFeedbackData] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [historyData, setHistoryData] = useState([
  ]); /* wait for real data to show here */

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <MdPendingActions size={25} />;
      case "Done":
        return <FaCheckCircle size={25} />;
      case "Deleted":
        return <FaTrash size={25} />;
      default:
        return null;
    }
  };  

  const getUnsendIcon = (unsend) => {
    switch (unsend) {
      case "Yes":
        return <FaCheckCircle size={25} />;
      case "No":
        return <RxCrossCircled size={25} />;
      default:
        return null;
    }
  };

  const handleSendFeedback = () => {
    /* base case */
    if (selectedType && feedbackData) {
      const newFeedback = {
        type: selectedType,
        problem: feedbackData,
        status: "Pending",
        unsend: "No",
      };

      setHistoryData((prevData) => [...prevData, newFeedback]);
      setSelectedType("");
      setFeedbackData("");
    }
  };

  const handleUnsendClick = (index) => {
    setHistoryData((prevData) => {
      const updatedData = [...prevData];
      const currentUnsendStatus = updatedData[index].unsend;
  
      if (currentUnsendStatus === "No") {
        updatedData[index].unsend = "Yes";
        updatedData[index].status = "Deleted";
      }
  
      return updatedData;
    });
  };  

  return (
    <div className="contact_container">
      <div className="contact_head">Contact Support</div>
      <div className="box_container">
        <div className="contact_box">
          <div className="left_half">
            <div className="history_container">
              <h2
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                }}
              >
                Transmission History
              </h2>
              <div className="history_scrollable">
                <table className="history_table">
                  <thead>
                    <tr>
                      <th style={{ width: "130px" }}>Types</th>{" "}
                      <th style={{ width: "190px" }}>Problems</th>{" "}
                      <th style={{ width: "100px" }}>Status</th>{" "}
                      <th style={{ width: "100px" }}>Unsend</th>{" "}
                    </tr>
                  </thead>
                  <tbody>
                    {historyData.slice(-5).map((data, index) => (
                      <tr key={index}>
                        <td>{data.type}</td>
                        <td style={{ width: "150px" }}>{data.problem}</td>{" "}
                        <td>{getStatusIcon(data.status)}</td>
                        <td
                          onClick={() => handleUnsendClick(index)}
                          style={{ cursor: "pointer" }}
                        >
                          {getUnsendIcon(data.unsend)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="separator-line"></div>
          <div className="right_half">
            <div className="feedback_container">
              <div className="head_container">
                <h2
                  style={{
                    textAlign: "Left",
                    fontSize: "20px",
                  }}
                >
                  Select problem type
                </h2>
              </div>
              <div className="type_selection">
                <div className="top">
                  <label>
                    <input
                      type="checkbox"
                      value="Blogs"
                      checked={selectedType === "Blogs"}
                      onChange={() => setSelectedType("Blogs")}
                    />
                    DekHor Blogs
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Dorms"
                      checked={selectedType === "Dorms"}
                      onChange={() => setSelectedType("Dorms")}
                    />
                    DekHor Dorms
                  </label>
                </div>
                <div className="bottom">
                  <label>
                    <input
                      type="checkbox"
                      value="Eats"
                      checked={selectedType === "Eats"}
                      onChange={() => setSelectedType("Eats")}
                    />
                    DekHor Eats
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Markets"
                      checked={selectedType === "Markets"}
                      onChange={() => setSelectedType("Markets")}
                    />
                    DekHor Markets
                  </label>
                </div>
              </div>
              <div className="textbox-container" style={{ paddingTop: "20px" }}>
                <textarea
                  placeholder="Type your feedback here..."
                  value={feedbackData}
                  onChange={(e) => setFeedbackData(e.target.value)}
                />
              </div>
              <button style={{ width: "100px" }} onClick={handleSendFeedback}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
