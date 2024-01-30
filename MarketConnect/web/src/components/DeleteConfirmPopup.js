import React from "react";
import "./DeleteConfirmPopup.scoped.css";

const DeleteConfirmPopup = ({ onCancel, onDelete }) => {
  return (
    <div className="popup-container">
      <div className="popup">
        <p>Confirm Delete?</p>
        <div className="popup-buttons">
          <button className="cancel-button" onClick={onCancel}>Cancle</button>
          <button className="delete-button" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmPopup;
