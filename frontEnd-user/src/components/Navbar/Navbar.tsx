import React, { useState, useEffect, memo, ChangeEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { IOrder, Order } from "../../models/Order";
import { IProductMerger } from "../../models/Order";
import Search from "../Modal/Search/Search";

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const update = useSelector((state: any) => state.update);
  const [dataCart, setDataCart] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [isCenterVisible, setIsCenterVisible] = useState<boolean>(true);

  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : undefined;
  useEffect(() => {
    if (user && user.id) {
      Order.getOrderById(user.id).then((data: IOrder) => {
        Order.getProductMerger(data.id!).then((product: IProductMerger) => {
          const value: any = product.OrderDetail;
          setDataCart(value);
        });
      });
    }
    if (location.pathname.includes("/detail")) {
      setValueSearch("");
    }
  }, [update, location.pathname]);

  const toggleCenterVisibility = () => {
    setIsCenterVisible((prevState) => !prevState);
  };
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const newValueSearch = e.target.value;
    setValueSearch(newValueSearch);
    if (valueSearch !== undefined) {
      navigate(`/home?name=${encodeURIComponent(newValueSearch)}`);
    }
  };

  return (
    <div className="navibar">
      {valueSearch && <Search />}
      <div className="navibar-down">
        <div className="logo-left">
          <a href="/home">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/projectshoes-cf747.appspot.com/o/673483.png?alt=media&token=fb222f9d-7894-4adb-80c8-10729ef5b496"
              alt=""
            />
          </a>
        </div>
        <div
          className="navi-center"
          style={{ display: isCenterVisible ? "block" : "none" }}
        >
          <ul className="nav nav-underline">
            <Link
              className="nav-link"
              to="/products?type=Men%27s%20Shoes&type=Kid%27s%20Shoes&type=Woman%27s%20Shoes"
            >
              <li id="list-nam" className="" role="button">
                all shoes
              </li>
            </Link>
            <Link className="nav-link" to="/products?type=Men%27s%20Shoes">
              <li id="list-nam" className="">
                men
              </li>
            </Link>

            <Link className="nav-link" to="/products?type=Woman%27s%20Shoes">
              <li id="list-nam" className="">
                women
              </li>
            </Link>

            <Link className="nav-link" to="/products?type=Kid%27s%20Shoes">
              <li id="list-nam" className="">
                kid
              </li>
            </Link>
          </ul>
        </div>
        <div className="menu-right">
          <div className="right-search">
            <input
              type="text"
              placeholder="SEARCH"
              value={valueSearch}
              onChange={(e) => handleSearch(e)}
            />
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

export default memo(Navbar);
