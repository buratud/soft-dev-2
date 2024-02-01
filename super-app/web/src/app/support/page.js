"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";

import "./style.css";

export default function ContactSupport() {
  const [feedbackData, setFeedbackData] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [historyData, setHistoryData] = useState(
    []
  ); /* wait for real data to show here */
  const [feedbackSent, setFeedbackSent] = useState(false);

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

      // Set feedbackSent to true to trigger the animation
      setFeedbackSent(true);

      // Reset feedbackSent after a short delay
      setTimeout(() => {
        setFeedbackSent(false);
      }, 1000); // Adjust the delay as needed
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

  const tableRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when historyData changes
    if (tableRef.current) {
      tableRef.current.scrollTop = tableRef.current.scrollHeight;
    }
  }, [historyData]);

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
              <div className="history_scrollable" ref={tableRef}>
                <table className="history_table">
                  <thead>
                    <tr>
                      <th style={{ width: "100px" }}>Types</th>
                      <th style={{ width: "170px" }}>Problems</th>
                      <th style={{ width: "100px" }}>Status</th>
                      <th style={{ width: "100px" }}>Unsend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyData.map((data, index) => (
                      <tr key={index}>
                        <td className={feedbackSent ? "feedback-success" : ""}>
                          {data.type}
                        </td>
                        <td
                          style={{ width: "190px" }}
                          className={feedbackSent ? "feedback-success" : ""}
                        >
                          {data.problem}
                        </td>
                        <td className={feedbackSent ? "feedback-success" : ""}>
                          {getStatusIcon(data.status)}
                        </td>
                        <td
                          style={{ width: "100px", textAlign: "center" }}
                          className={feedbackSent ? "feedback-success" : ""}
                        >
                          <div
                            onClick={() => handleUnsendClick(index)}
                            style={{ cursor: "pointer" }}
                          >
                            {getUnsendIcon(data.unsend)}
                          </div>
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
                    fontSize: "18px",
                  }}
                >
                  In what type of DekHor do you have a problem?
                </h2>
              </div>
              <div className="type_selection">
                <div className="top">
                  <div className="checkbox-label">
                    <input
                      type="checkbox"
                      value="Blogs"
                      checked={selectedType === "Blogs"}
                      onChange={() => setSelectedType("Blogs")}
                    />
                    <span>DekHor Blogs</span>
                  </div>
                  <div className="checkbox-label">
                    <input
                      type="checkbox"
                      value="Dorms"
                      checked={selectedType === "Dorms"}
                      onChange={() => setSelectedType("Dorms")}
                    />
                    <span>DekHor Dorms</span>
                  </div>
                </div>
                <div className="bottom">
                  <div className="checkbox-label">
                    <input
                      type="checkbox"
                      value="Eats"
                      checked={selectedType === "Eats"}
                      onChange={() => setSelectedType("Eats")}
                    />
                    <span>DekHor Eats</span>
                  </div>
                  <div className="checkbox-label">
                    <input
                      type="checkbox"
                      value="Markets"
                      checked={selectedType === "Markets"}
                      onChange={() => setSelectedType("Markets")}
                    />
                    <span>DekHor Markets</span>
                  </div>
                </div>
              </div>
              <div className="textbox-container" style={{ paddingTop: "20px" }}>
                <textarea
                  placeholder="Type your problem here..."
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
