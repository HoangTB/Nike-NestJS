import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { UserAPI } from "../../models/LoginRegister";
import { updateState } from "../../store/slice/UpdateProSlice";
const Header: React.FC = () => {
  const [user, setUser] = useState<any>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const update = useSelector((state: any) => state.update);
  let userLocal: any;
  useEffect(() => {
    let userData = localStorage.getItem("user");
    userLocal = userData ? JSON.parse(userData) : undefined;
    if (userLocal) {
      UserAPI.getUserId(Number(userLocal?.id))
        .then((e: any) => {
          setUser(e);
        })
        .catch();
    } else {
      setUser("");
    }
  }, [update]);

  const handleUserClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleClickOutside = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogOut = async () => {
    dispatch(updateState());
    navigate("/login");
  };

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
              <a>Find a store</a>
            </li>
            <li>
              <Link to="/help">Help</Link>
            </li>
            {user !== "" ? (
              <li>
                <Link to="/profiles">
                  Hi {user.lastName} {user.firstName}
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login">Sign In</Link>
              </li>
            )}
          </ul>
          {user ? (
            <div className="user-dropdown">
              <i
                className={"fa-solid fa-user fa-fade i-user "}
                onClick={handleUserClick}
              ></i>
              {isOpen && (
                <ul className="user-list">
                  <Link to={"/profiles"}>
                    {" "}
                    <li>Profile</li>
                  </Link>
                  <Link to={"/history"}>
                    <li>History Order</li>
                  </Link>
                  <Link to={"/login"}>
                    <li onClick={handleLogOut}>Logout</li>
                  </Link>
                </ul>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
