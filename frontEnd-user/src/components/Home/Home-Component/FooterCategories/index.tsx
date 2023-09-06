import React from "react";
import "./FooterCategories.css";
const FooterCategories: React.FC = () => {
  return (
    <div className="container mt-5 mb-5 gap-3">
      <div className="row  w-100">
        <div className="col-md-3">
          <h5>Shoes</h5>
          <ul className="list-unstyled">
            <li>All Shoes</li>
            <li>Training Shoes</li>
            <li>Cleats</li>
            <li>Running Shoes</li>
          </ul>
        </div>
        <div className="col-md-3">
          <h5>Clothing</h5>
          <ul className="list-unstyled">
            <li>All Clothing</li>
            <li>Tops</li>
            <li>Pants and Leggings</li>
            <li>Jackets</li>
          </ul>
        </div>
        <div className="col-md-3">
          <h5>Kids</h5>
          <ul className="list-unstyled">
            <li>Kids' Training Shoes</li>
            <li>Kids' Backpacks</li>
            <li>Kids' Cleats</li>
            <li>Kids' Running Shoes</li>
          </ul>
        </div>
        <div className="col-md-3">
          <h5>Featured</h5>
          <ul className="list-unstyled">
            <li>New Releases</li>
            <li>Nike Run Club</li>
            <li>Nike Training Club</li>
            <li>Backpacks and Bags</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterCategories;
