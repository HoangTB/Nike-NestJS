import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { Products } from "../../models/Product";

const Navbar: React.FC = () => {
  const location = useLocation();
  const update = useSelector((state: any) => state.update);
  const [dataCart, setDataCart] = useState([]);

  const [isCenterVisible, setIsCenterVisible] = useState<boolean>(true);
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : undefined;
  useEffect(() => {
    if (user && user.id) {
      Products.getProductMerger(user.id)
        .then((product: any) => {
          setDataCart(product[0]?.OrderDetails);
        })
        .catch();
    }
  }, [update, location.pathname]);

  const toggleCenterVisibility = () => {
    setIsCenterVisible((prevState) => !prevState);
  };

  return (
    <div className="navibar">
      <div className="navibar-down">
        <div className="logo-left">
          <Link to="/home">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/projectshoes-cf747.appspot.com/o/673483.png?alt=media&token=fb222f9d-7894-4adb-80c8-10729ef5b496"
              alt=""
            />
          </Link>
        </div>
        <div
          className="navi-center"
          style={{ display: isCenterVisible ? "block" : "none" }}
        >
          <ul className="nav nav-underline">
            <Link
              className="nav-link"
              to="/products/Men's Shoes&Kid's Shoes&Woman's Shoes"
            >
              <li id="list-nam" className="" role="button">
                all shoes
              </li>
            </Link>
            <Link className="nav-link" to="/products/Men's Shoes">
              <li id="list-nam" className="">
                men
              </li>
            </Link>

            <Link className="nav-link" to="/products/Woman's Shoes">
              <li id="list-nam" className="">
                women
              </li>
            </Link>

            <Link className="nav-link" to="/products/Kid's Shoes">
              <li id="list-nam" className="">
                kid
              </li>
            </Link>
          </ul>
        </div>
        <div className="menu-right">
          <div className="right-search">
            <input type="text" placeholder="SEARCH" />
            <i className="fa-solid fa-magnifying-glass fa-fade" />
          </div>
          <Link className="fa-regular fa-heart" to="/favorites"></Link>
          <Link
            className="fa-solid fa-bag-shopping fa-bounce position-relative"
            to="/cart"
          >
            <span className="position-absolute">
              {user && dataCart ? dataCart.length : 0}
            </span>
          </Link>
          <Link
            className="fa-solid fa-list"
            to=""
            onClick={toggleCenterVisibility}
          ></Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
