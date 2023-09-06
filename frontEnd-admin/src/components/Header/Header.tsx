import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="header-top">
        <div className="content-left">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/projectshoes-cf747.appspot.com/o/Jumpman_logo.svg.png?alt=media&token=f0107eb1-1835-477f-b1dc-4ab702e9dcf4"
            alt="jordan"
          />
        </div>
        <div className="content-right">
          <ul>
            <li>
              <Link to="/help">Find a store</Link>
            </li>
            <li>
              <Link to="/help">Help</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
