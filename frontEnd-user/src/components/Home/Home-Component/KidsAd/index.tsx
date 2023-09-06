import React from "react";
import "./KidsAd.css";
const KidsAd: React.FC = () => {
  return (
    <div className="mb-5">
      <div className="head-text">
        <h2 className="text-2xl">Don't Miss Out</h2>
        <div className="image-wrapper mt-4 mb-5">
          <img
            className="d-none d-lg-block d-md-block w-100"
            src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1824,c_limit/cfc94562-b61c-4c31-8601-f721d8bb75a7/resmi-nike-sitesi.jpg"
            alt="Kids Ad Maintain"
          />
        </div>
        <div className="text-center">
          <p>Nike max Air</p>
          <span className="text-kids-ad-head-text">AIR MAX MOTIF FOR KIDS</span>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary bg-black rounded-full px-6 py-1.5 text-white text-opacity-80 hover:bg-gray-400">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default KidsAd;
