import React from "react";
import "./HeaderMain.css";
const HeaderMain: React.FC = () => {
  return (
    <div className="header-main">
      <span>New Nike United Pack</span>
      <span className="head-text">UNITY FOREVER</span>
      <span>It's a new dawn of football</span>
      <div className="buttons-main">
        <button className="btn btn-primary">Shop</button>
      </div>
    </div>
  );
};

export default HeaderMain;
