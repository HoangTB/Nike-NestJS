import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <div className="modal-login">
      <div className="modal-null-login">
        <p>Session expired, please log in again !</p>
        <div className="modal-null-button">
          <Link to="/login">
            <button className="login-btn-ok">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
