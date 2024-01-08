import React from "react";

export const LDBox = () => {
  return (
    <div className="min-h-screen flex items-center">
      <div className="box bg-white rounded-lg shadow-lg p-4">
        <div className="recleft-components">
          <div className="overlap-group">
            <div className="flexcontainer">
              <p className="text" text-white>
                <span className="text-wrapper">👋 Good Day <br /></span>
              </p>
              <p className="text" text-white>
                <span className="span">KHUNAPOJ SUTTENON</span>
              </p>
            </div>
            <img className="profile-pic" src="img/profile-pic.png" />
            <div className="sign-out">
              <div className="div" text-white> Sign Out</div>
              <img className="img" src="img/icons8-sign-out-96-1.png" />
            </div>
            <div className="settings">
              <div className="text-wrapper-2" text-white> App Settings</div>
              <img className="img-2" src="img/icons8-settings-96-1.png" />
            </div>
            <div className="items">
              <div className="text-wrapper-3" text-white> Items</div>
              <img className="img" src="img/icons8-filing-cabinet-96-1.png" />
            </div>
            <div className="dashboard">
              <div className="text-wrapper-4" text-white> Dashboard</div>
              <img className="img-2" src="img/icons8-dashboard-96-1.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

