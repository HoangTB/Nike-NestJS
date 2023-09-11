import React from "react";
import Header from "../../components/Header/Header";
import SwiperNotification from "../../components/SwiperNotification/SwiperNotification";
import Footer from "../../components/Footer/Footer";
import { DefaultLayoutProps } from "../../types/Types";
import Navbar from "../../components/Navbar/Navbar";
const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Navbar />
      <SwiperNotification />
      <br />
      {children}
      <br />
      <Footer />
    </>
  );
};

export default DefaultLayout;
