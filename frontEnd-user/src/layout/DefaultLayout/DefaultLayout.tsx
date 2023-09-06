import React from "react";
import Header from "../../components/Header/Header";
import SwiperNotification from "../../components/SwiperNotification/SwiperNotification";
import Footer from "../../components/Footer/Footer";
import { DefaultLayoutProps } from "../../types/Types";
import { IProducts } from "../../models/Product";
import Navbar from "../../components/Navbar/Navbar";
const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  onFilteredOptionsApp,
}) => {
  const onFilteredOptions = async (filteredOptions: IProducts[]) => {
    try {
      await onFilteredOptionsApp!(filteredOptions);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Header />
      <Navbar onFilteredOptions={onFilteredOptions} />
      <SwiperNotification />
      <br />
      {children}
      <br />
      <Footer />
    </>
  );
};

export default DefaultLayout;
