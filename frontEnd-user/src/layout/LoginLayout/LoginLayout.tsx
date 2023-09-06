import React from "react";
import Header from "../../components/Header/Header";

import Footer from "../../components/Footer/Footer";
import { DefaultLayoutProps } from "../../types/Types";
import Navbar from "../../components/Navbar/Navbar";

const LoginLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const onFilteredOptions = async () => {};
  return (
    <div className="vh-100">
      <Header />
      <Navbar onFilteredOptions={onFilteredOptions} />
      <br />
      {children}
      <br />
      <Footer />
    </div>
  );
};

export default LoginLayout;
