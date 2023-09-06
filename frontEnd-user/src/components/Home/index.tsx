import React from "react";
import MainPhoto from "./Home-Component/MainPhoto";
import SliderMain from "./Home-Component/SliderMain";
import FooterCategories from "./Home-Component/FooterCategories";
import MoreNike from "./Home-Component/MoreNike";
import JoinUs from "./Home-Component/JoinUs";
import OurApps from "./Home-Component/OurApps";
import KidsAd from "./Home-Component/KidsAd";
import SliderSecondary from "./Home-Component/SliderSecondary";
import Maintain from "./Home-Component/Maintain";

const Home: React.FC = () => {
  return (
    <div className="mx-5 min-vh-40">
      <MainPhoto />
      <SliderMain />
      <Maintain />
      <SliderSecondary />
      <KidsAd />
      <OurApps />
      <JoinUs />
      <MoreNike />
      <FooterCategories />
    </div>
  );
};

export default Home;
