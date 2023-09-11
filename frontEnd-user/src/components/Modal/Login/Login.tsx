import React from "react";
import "./Login.css";

const Login: React.FC = () => {
  return (
    <div className="modal-login">
      <div className="modal-null-login">
        <p>Session expired, please log in again !</p>
        <div className="modal-null-button">
          <a href="/login">
            <button className="login-btn-ok">Login</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
