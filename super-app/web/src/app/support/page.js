"use client";

import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
// import { MdPendingActions } from "react-icons/md";
// import { RxCrossCircled } from "react-icons/rx";
import { ImSpinner9 } from "react-icons/im";

import "./style.css";
import Navbar from "./navbar.js";

export default function ContactSupport() {
  const [feedbackData, setFeedbackData] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unsendLoading, setUnsendLoading] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [unsendSuccess, setUnsendSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate an API call to load data when the component mounts
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

  useEffect(() => {
    // Scroll to the most bottom of the table after the component re-renders
    const lastRow = document.querySelector(
      ".history_table tbody tr:last-child"
    );
    if (lastRow) {
      lastRow.scrollIntoView({ behavior: "smooth", block: "end" });
    }

    // Reset feedbackSent after a short delay
    if (feedbackSent) {
      setTimeout(() => {
        setFeedbackSent(false);
      }, 1000); // Adjust the delay as needed
    }
  }, [feedbackData, feedbackSent]);

  // const getStatusIcon = (status) => {
  //   switch (status) {
  //     case "Pending":
  //       return <MdPendingActions size={25} />;
  //     case "Done":
  //       return <FaCheckCircle size={25} />;
  //     case "Deleted":
  //       return <FaTrash size={25} />;
  //     default:
  //       return null;
  //   }
  // };

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

  const fetchDataFromApi = async () => {
    // Simulate an API call (replace with actual API call)
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = [
          // Sample data, replace with actual API response
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
          // ... more data
        ];
        resolve(data);
      }, 1000);
    });
  };

  const handleUnsendClick = (index) => {
    setHistoryData((prevData) => {
      const updatedData = [...prevData];
      const currentUnsendStatus = updatedData[index].unsend;
  
      if (currentUnsendStatus === "No") {
        setUnsendLoading(true);
  
        // Simulate an API call (replace with actual API call)
        new Promise((resolve) => setTimeout(resolve, 1000))
          .then(async () => {
            // Assuming you want to send the designated problem to the server
            const unsentProblem = updatedData[index];
  
            // Simulate sending the data to the server
            await sendUnsentProblemToServer(unsentProblem);
  
            // Update local data
            updatedData[index].unsend = "Yes";
            updatedData[index].status = "Unsent"; // Set status to "Unsent" on unsend
            setUnsendSuccess(true);
  
            // Reset unsendSuccess after a short delay
            setTimeout(() => {
              setUnsendSuccess(false);
            }, 1000); // Adjust the delay as needed
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
  
  const sendUnsentProblemToServer = async (problemData) => {
    // Simulate sending the designated problem data to the server
    console.log("Sending unsent problem to the server:", problemData);
    // Replace the console.log with your actual API call
    // For example, you can use fetch or axios to send the data to your server
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };
   

  const handleSendFeedback = () => {
    if (selectedType && feedbackData) {
      setLoading(true);

      // Simulate an API call (replace with actual API call)
      new Promise((resolve) => setTimeout(resolve, 1000))
        .then(async () => {
          const newFeedback = {
            type: selectedType,
            problem: feedbackData,
            status: "Pending", // Set status to "Pending" on submission
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

  return (
    <div>
      {/* Navbar component */}
      <Navbar />
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
                  {loading ? (
                    <div className="loading-indicator">
                      <ImSpinner9 className="loading-icon" size={25} />
                    </div>
                  ) : (
                    <table className="history_table">
                      <thead>
                        <tr>
                          <th style={{ width: "15%" }}>Types</th>
                          <th style={{ width: "55%" }}>Problems</th>
                          <th style={{ width: "15%" }}>Status</th>
                          <th style={{ width: "15%" }}>Unsend</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historyData.map((data, index) => (
                          <tr key={index}>
                            <td
                              className={
                                index === historyData.length - 1 && feedbackSent
                                  ? "feedback-success"
                                  : ""
                              }
                            >
                              {data.type}
                            </td>
                            <td
                              className={
                                index === historyData.length - 1 && feedbackSent
                                  ? "feedback-success"
                                  : ""
                              }
                            >
                              {data.problem}
                            </td>
                            <td
                              className={
                                index === historyData.length - 1 && feedbackSent
                                  ? "feedback-success"
                                  : ""
                              }
                            >
                              {data.status}
                            </td>
                            <td
                              className={
                                index === historyData.length - 1 && feedbackSent
                                  ? "feedback-success"
                                  : ""
                              }
                            >
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
                <button
                  className="special-button"
                  style={{ width: "100px" }}
                  onClick={handleSendFeedback}
                  disabled={loading}
                >
                  {loading ? (
                    <ImSpinner9 className="loading-icon" size={18} />
                  ) : (
                    "Send"
                  )}
                </button>
                {feedbackSent && (
                  <div className="success-message">Problem sent!</div>
                )}
                {unsendSuccess && (
                  <div className="success-message">Problem unsent!</div>
                )}
                {error && <div className="error-message">{error}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
