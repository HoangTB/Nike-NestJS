import React from "react";
import Header from "../../components/Header/Header";
import Login from "../../components/Login/Login";
import Footer from "../../components/Footer/Footer";

const DefaultLayoutLogin: React.FC = () => {
  return (
    <div>
      <Header />
      <Login />
      <Footer />
    </div>
  );
};

export default DefaultLayoutLogin;
