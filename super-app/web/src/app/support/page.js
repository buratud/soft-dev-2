// Import necessary dependencies and styles
"use client";
import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";

import { createClient } from "@supabase/supabase-js";

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
  const [unsendClickedIndex, setUnsendClickedIndex] = useState(null);

  // Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Function to etch data only once when the component mounts.
  useEffect(() => {
    fetchDataFromSupabase();
  }, []);

  useEffect(() => {
    const lastRow = document.querySelector(
      ".history_table tbody tr:last-child"
    );

    if (lastRow) {
      if (feedbackSent) {
        lastRow.classList.add("feedback-success");
        setTimeout(() => {
          lastRow.classList.remove("feedback-success");
          setFeedbackSent(false);
        }, 1000);
      } else if (unsendSuccess && unsendClickedIndex !== null) {
        lastRow.classList.add("unsend-success");
        setTimeout(() => {
          lastRow.classList.remove("unsend-success");
          setUnsendSuccess(false);
          setUnsendClickedIndex(null);
        }, 1000);
      }
    }
  }, [feedbackSent, unsendSuccess, unsendClickedIndex]);

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

  // Function to fetch data from Supabase
  const fetchDataFromSupabase = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("problems")
        .select("*")
        .order("date_create");

      if (error) {
        throw new Error("Failed to fetch data from Supabase");
      }

      setHistoryData(data);
    } catch (err) {
      setError("An error occurred while fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  // Function to handle unsend button click
  const handleUnsendClick = async (index) => {
    const feedbackId = historyData[index].unique_id; // Assuming the primary key column is unique_id

    setUnsendLoading(true);

    try {
      const { error } = await supabase
        .from("problems")
        .update({ status: "Unsent", unsend: "Yes" }, { returning: "minimal" })
        .eq("unique_id", feedbackId);

      if (error) {
        throw new Error(
          "An error occurred while un-sending feedback. Please try again."
        );
      }

      // Set the index of the row clicked for unsend
      setUnsendClickedIndex(index);

      // Refresh data from Supabase
      await fetchDataFromSupabase();
    } catch (err) {
      setError(
        err.message ||
          "An error occurred while un-sending feedback. Please try again."
      );
    } finally {
      setUnsendLoading(false);
    }
  };

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

  const handleSendProblem = async () => {
    if (selectedType && feedbackData) {
      setLoading(true);

      const feedbackDataToSend = {
        user_id: "US5535",
        email: "me@me.com",
        type: selectedType,
        problem: feedbackData,
        status: "Pending",
        unsend: "No",
      };

      console.log("Data sent:", feedbackDataToSend);

      try {
        const { data, error } = await supabase
          .from("problems")
          .upsert([feedbackDataToSend], {
            onConflict: ["unique_id", "date_create"],
          });

        if (error) {
          throw new Error(
            "An error occurred while sending feedback. Please try again."
          );
        }
        setSelectedType('');
        setFeedbackData('');
        setFeedbackSent(true);
  
        // Refresh data from Supabase
        await fetchDataFromSupabase();
      } catch (err) {
        setError('An error occurred while sending feedback. Please try again.');
      } finally {
        setLoading(false);
      }
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
                          <tr
                            key={index}
                            className={
                              index === unsendClickedIndex || unsendSuccess
                                ? "unsend-success"
                                : index === historyData.length - 1 &&
                                  feedbackSent
                                ? "feedback-success"
                                : ""
                            }
                          >
                            {/* Conditional class for feedback success */}
                            <td>{data.type}</td>
                            {/* Conditional class for feedback success */}
                            <td>{data.problem}</td>
                            {/* Conditional class for feedback success */}
                            <td>{data.status}</td>
                            {/* Conditional class for feedback success */}
                            <td>
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
                  onClick={handleSendProblem}
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