// Import necessary dependencies and styles
"use client";
import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { createClient } from "@supabase/supabase-js";

import "./style.css";
import Navbar from "../../../components/nav.jsx";
import Footer from "../../../components/footer/Footer.jsx";
import {
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_BASE_API_URL,
} from "../../../config";
import axios from "axios";

// Define the main component
export default function ContactSupport() {
  // State variables
  const [feedbackData, setFeedbackData] = useState(""); // State for storing feedback input
  const [selectedType, setSelectedType] = useState(""); // State for storing selected problem type
  const [historyData, setHistoryData] = useState([]); // State for storing transmission history data
  const [loading, setLoading] = useState(false); // State for tracking loading status
  const [setUnsend, setUnsendLoading] = useState(false); // State for tracking unsend operation loading status
  const [user, setUser] = useState({});
  const [feedbackSent, setFeedbackSent] = useState(false); // State for tracking feedback sent status
  const [unsendSuccess, setUnsendSuccess] = useState(false); // State for tracking unsend success status
  const [error, setError] = useState(null); // State for storing error messages
  const [unsendClickedIndex, setUnsendClickedIndex] = useState(null); // State for tracking the index of the clicked row for unsend
  const supabase = createClient(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    supabase.auth.getSession().then((result) => {
      axios
      .get(`${NEXT_PUBLIC_BASE_API_URL}/users/${result.data.session.user.id}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      });
    });
  }, []);

  // user_id and email
  const user_id = user?.id;
  const email = user?.email;
  console.log(user_id, email);

  // Function to get unsend icon based on the unsend status
  const getUnsendIcon = (unsend) => {
    switch (unsend) {
      case "Yes":
        return <FaCheckCircle size={23} />;
      case "No":
        return <FaTrash size={23} />;
      default:
        return null;
    }
  };

  // Function to fetch data only once when the component mounts.
  useEffect(() => {
    fetchDataFromSupabase(); // Initial data fetch
  }, []);

  // Function to scroll to the last row when historyData changes
  useEffect(() => {
    const lastRow = document.querySelector(
      ".history_table tbody tr:last-child"
    );
    if (lastRow) {
      lastRow.scrollIntoView({ behavior: "instant", block: "end" }); // Scroll to the last row instantly when historyData changes
    }
  }, [historyData]);

  // Function to handle visual feedback for success or unsend operations
  useEffect(() => {
    const lastRow = document.querySelector(
      ".history_table tbody tr:last-child"
    );

    if (lastRow) {
      // Apply feedback success or unsend success visual effects
      if (feedbackSent) {
        lastRow.classList.add("feedback-success");
        setTimeout(() => {
          lastRow.classList.remove("feedback-success");
          setFeedbackSent(false);
        }, 1400);
      }
      if (unsendSuccess && feedbackSent != true) {
        lastRow.classList.add("unsend-success");
        setTimeout(() => {
          lastRow.classList.remove("unsend-success");
          setUnsendSuccess(false);
          setUnsendClickedIndex(null);
        }, 1400);
      }
    }
  }, [feedbackSent, unsendSuccess, unsendClickedIndex]);

  // Handle scrolling and feedback sent state changes
  useEffect(() => {
    const lastRow = document.querySelector(
      ".history_table tbody tr:last-child"
    );
    if (lastRow) {
      lastRow.scrollIntoView({ behavior: "instant", block: "end" }); // Scroll to the last row instantly when feedback is sent or unsend success
    }

    if (feedbackSent) {
      // Reset feedbackSent after 1 second
      setTimeout(() => {
        setFeedbackSent(false);
      }, 1400);
    }
  }, [feedbackData, feedbackSent]);

  useEffect(() => {
    if (user?.id && user?.email) {
      fetchDataFromSupabase(user.id, user.email);
    }
  }, [user]); // Run this effect whenever user object changes

  // Function to fetch data from Supabase
  const fetchDataFromSupabase = async (userId, userEmail) => {
    try {
      setLoading(true);

      // Fetch data from Supabase with filtering
      const { data, error } = await supabase
        .from("problems")
        .select("*")
        .eq("user_id", userId)
        .eq("email", userEmail)
        .order("date_create");

      if (error) {
        throw new Error("Failed to fetch data from Supabase");
      }

      setHistoryData(data);
    } catch (err) {
      setError("Fetching data failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Call this function only when needed
  const refreshData = async () => {
    await fetchDataFromSupabase(); // Refresh data from Supabase
  };

  // Function to handle unsend button click
  const handleUnsendClick = async (index) => {
    const feedbackId = historyData[index].id; // Get the unique identifier for the selected feedback

    setUnsendLoading(true); // Set unsend loading status to true

    try {
      // Update the status to "Unsent" and set unsend to "Yes" in the Supabase table for the selected feedback
      const { error } = await supabase
        .from("problems")
        .update({ status: "Unsent", unsend: "Yes" }, { returning: "minimal" })
        .eq("id", feedbackId);

      if (error) {
        throw new Error("Unsending problem failed."); // Throw an error if unsend operation fails
      }

      setUnsendClickedIndex(index); // Set the index of the row clicked for unsend

      await fetchDataFromSupabase(); // Refresh data from Supabase after unsend operation
    } catch (err) {
      setError(err.message || "Unsending problem failed."); // Set error message if an error occurs during unsend operation
    } finally {
      setUnsendLoading(false); // Set unsend loading status to false after unsend operation completion (success or failure)
    }
  };

  // Function to handle sending problem
  const handleSendProblem = async () => {
    if (selectedType && feedbackData) {
      setLoading(true); // Set loading status to true during feedback submission

      const feedbackDataToSend = {
        user_id: user_id,
        email: email,
        type: selectedType,
        problem: feedbackData,
        status: "Pending",
        unsend: "No",
      };

      console.log("Data sent:", feedbackDataToSend); // Log the data being sent for feedback

      try {
        // Upsert the feedback data into the Supabase table, using "id" and "date_create" as conflict resolution criteria
        const { data, error } = await supabase
          .from("problems")
          .upsert([feedbackDataToSend], {
            onConflict: ["id", "date_create"],
          });

        if (error) {
          throw new Error("Sending problem failed."); // Throw an error if feedback submission fails
        }

        setHistoryData([...historyData, feedbackDataToSend]); // Manually update the state to avoid additional API call

        setSelectedType(""); // Reset selectedType state
        setFeedbackData(""); // Reset feedbackData state
        setFeedbackSent(true); // Set feedbackSent status to true

        const lastRow = document.querySelector(
          ".history_table tbody tr:last-child"
        );
        if (lastRow) {
          lastRow.scrollIntoView({ behavior: "instant", block: "end" }); // Scroll to the last row instantly after feedback is sent
        }
      } catch (err) {
        setError("Sending problem failed."); // Set error message if an error occurs during feedback submission
      } finally {
        setLoading(false); // Set loading status to false after feedback submission completion (success or failure)
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
                      <ImSpinner9 className="loading-icon" size={23} />
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
                                  size={23}
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
      <Footer />
    </div>
  );
}
