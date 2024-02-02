// Import necessary dependencies and styles
"use client";
import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";

import "./style.css";
import Navbar from "./navbar.js";

// Define the main component
export default function ContactSupport() {
  // State variables
  const [feedbackData, setFeedbackData] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unsendLoading, setUnsendLoading] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [unsendSuccess, setUnsendSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    setLoading(true);
    fetchDataFromApi()
      .then((data) => {
        setHistoryData(data);
      })
      .catch((err) => {
        setError("An error occurred while fetching data. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Handle scrolling and feedback sent state changes
  useEffect(() => {
    const lastRow = document.querySelector(
      ".history_table tbody tr:last-child"
    );
    if (lastRow) {
      lastRow.scrollIntoView({ behavior: "smooth", block: "end" });
    }

    if (feedbackSent) {
      // Reset feedbackSent after 1 second
      setTimeout(() => {
        setFeedbackSent(false);
      }, 1000);
    }
  }, [feedbackData, feedbackSent]);

  // Return an appropriate icon based on unsend status
  const getUnsendIcon = (unsend) => {
    switch (unsend) {
      case "Yes":
        return <FaCheckCircle size={25} />;
      case "No":
        return <FaTrash size={25} />;
      default:
        return null;
    }
  };

  // Simulate fetching data from an API
  const fetchDataFromApi = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = [
          {
            type: "Blogs",
            problem: "Issue 1",
            status: "Pending",
            unsend: "No",
          },
          {
            type: "Dorms",
            problem: "Issue 2",
            status: "Unsent",
            unsend: "Yes",
          },
        ];
        resolve(data);
      }, 1000);
    });
  };

  // Handle clicking on the unsend button
  const handleUnsendClick = (index) => {
    setHistoryData((prevData) => {
      const updatedData = [...prevData];
      const currentUnsendStatus = updatedData[index].unsend;

      if (currentUnsendStatus === "No") {
        setUnsendLoading(true);

        new Promise((resolve) => setTimeout(resolve, 1000))
          .then(async () => {
            updatedData[index].unsend = "Yes";
            updatedData[index].status = "Unsent";
            setUnsendSuccess(true);

            // Reset unsendSuccess after 1 second
            setTimeout(() => {
              setUnsendSuccess(false);
            }, 1000);
          })
          .catch((err) => {
            setError("An error occurred. Please try again.");
          })
          .finally(() => {
            setUnsendLoading(false);
          });
      }

      return updatedData;
    });
  };

  // Handle sending feedback
  const handleSendFeedback = () => {
    if (selectedType && feedbackData) {
      setLoading(true);

      new Promise((resolve) => setTimeout(resolve, 1000))
        .then(async () => {
          const newFeedback = {
            type: selectedType,
            problem: feedbackData,
            status: "Pending",
            unsend: "No",
          };

          setHistoryData((prevData) => [...prevData, newFeedback]);
          setSelectedType("");
          setFeedbackData("");
          setFeedbackSent(true);
        })
        .catch((err) => {
          setError("An error occurred. Please try again.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  /* Main JSX structure for the component */
  return (
    <div>
      {/* Include the Navbar component */}
      <Navbar />
      {/* Main container for the contact section */}
      <div className="contact_container">
        {/* Header for the contact section */}
        <div className="contact_head">Contact Support</div>
        {/* Container for the main content boxes */}
        <div className="box_container">
          {/* Main contact box */}
          <div className="contact_box">
            {/* Left half of the contact box */}
            <div className="left_half">
              {/* Container for transmission history */}
              <div className="history_container">
                {/* Heading for transmission history */}
                <h2
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                  }}
                >
                  Transmission History
                </h2>
                {/* Scrollable history section */}
                <div className="history_scrollable">
                  {/* Conditionally render loading indicator or history table */}
                  {loading ? (
                    <div className="loading-indicator">
                      <ImSpinner9 className="loading-icon" size={25} />
                    </div>
                  ) : (
                    <table className="history_table">
                      {/* Table header */}
                      <thead>
                        <tr>
                          <th style={{ width: "15%" }}>Types</th>
                          <th style={{ width: "55%" }}>Problems</th>
                          <th style={{ width: "15%" }}>Status</th>
                          <th style={{ width: "15%" }}>Unsend</th>
                        </tr>
                      </thead>
                      {/* Table body */}
                      <tbody>
                        {/* Map through historyData to create rows */}
                        {historyData.map((data, index) => (
                          <tr key={index}>
                            {/* Conditional class for feedback success */}
                            <td
                              className={
                                index === historyData.length - 1 && feedbackSent
                                  ? "feedback-success"
                                  : ""
                              }
                            >
                              {data.type}
                            </td>
                            {/* Conditional class for feedback success */}
                            <td
                              className={
                                index === historyData.length - 1 && feedbackSent
                                  ? "feedback-success"
                                  : ""
                              }
                            >
                              {data.problem}
                            </td>
                            {/* Conditional class for feedback success */}
                            <td
                              className={
                                index === historyData.length - 1 && feedbackSent
                                  ? "feedback-success"
                                  : ""
                              }
                            >
                              {data.status}
                            </td>
                            {/* Conditional class for feedback success */}
                            <td
                              className={
                                index === historyData.length - 1 && feedbackSent
                                  ? "feedback-success"
                                  : ""
                              }
                            >
                              {/* Conditionally render loading icon or unsend icon */}
                              {data.loading ? (
                                <ImSpinner9
                                  className="loading-icon"
                                  size={25}
                                />
                              ) : (
                                <div
                                  onClick={() => handleUnsendClick(index)}
                                  style={{ cursor: "pointer" }}
                                >
                                  {getUnsendIcon(data.unsend)}
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
            {/* Separator line between left and right halves */}
            <div className="separator-line"></div>
            {/* Right half of the contact box */}
            <div className="right_half">
              {/* Container for feedback section */}
              <div className="feedback_container">
                {/* Container for feedback section header */}
                <div className="head_container">
                  {/* Heading for selecting problem type */}
                  <h2
                    style={{
                      textAlign: "Left",
                      fontSize: "20px",
                    }}
                  >
                    Select problem type
                  </h2>
                </div>
                {/* Container for type selection checkboxes */}
                <div className="type_selection">
                  <div className="top">
                    {/* Checkbox for DekHor Blogs */}
                    <div className="checkbox-label">
                      <input
                        type="checkbox"
                        value="Blogs"
                        checked={selectedType === "Blogs"}
                        onChange={() => setSelectedType("Blogs")}
                      />
                      <span>DekHor Blogs</span>
                    </div>
                    {/* Checkbox for DekHor Dorms */}
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
                    {/* Checkbox for DekHor Eats */}
                    <div className="checkbox-label">
                      <input
                        type="checkbox"
                        value="Eats"
                        checked={selectedType === "Eats"}
                        onChange={() => setSelectedType("Eats")}
                      />
                      <span>DekHor Eats</span>
                    </div>
                    {/* Checkbox for DekHor Markets */}
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
                {/* Textarea for feedback input */}
                <div
                  className="textbox-container"
                  style={{ paddingTop: "20px" }}
                >
                  <textarea
                    placeholder="Type your feedback here..."
                    value={feedbackData}
                    onChange={(e) => setFeedbackData(e.target.value)}
                  />
                </div>
                {/* Button for sending feedback */}
                <button
                  className="special-button"
                  style={{ width: "100px" }}
                  onClick={handleSendFeedback}
                  disabled={loading}
                >
                  {/* Conditionally render loading icon or "Send" text */}
                  {loading ? (
                    <ImSpinner9 className="loading-icon" size={18} />
                  ) : (
                    "Send"
                  )}
                </button>
                {/* Success message for feedback sent */}
                {feedbackSent && (
                  <div className="success-message">Problem sent!</div>
                )}
                {/* Success message for feedback unsent */}
                {unsendSuccess && (
                  <div className="success-message">Problem unsent!</div>
                )}
                {/* Error message display */}
                {error && <div className="error-message">{error}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
