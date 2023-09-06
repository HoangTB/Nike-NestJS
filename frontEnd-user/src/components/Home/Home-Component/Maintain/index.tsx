import React from "react";
import "./Maintain.css";
const Maintain: React.FC = () => {
  return (
    <div>
      <div className="header-text-maintain mb-4">
        <span className="h3">Styles That Will Take You Forward</span>
      </div>

      <div className="row row-cols-1 row-cols-md-2 mb-5">
        <div className="col">
          <div className="position-relative">
            <div className="form-titleImg">
              New Season. New Goals.
              <div className="mt-5">
                <button className="btn btn-light rounded-full px-4 py-1.5 text-black text-opacity-80 hover:bg-gray-300">
                  Explore
                </button>
              </div>
            </div>
            <img
              src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_906,c_limit/6dafc759-2932-41c8-aa49-8a04f9f7d334/resmi-nike-sitesi.jpg"
              alt="styles that will take you forward"
              className="img-fluid"
            />
          </div>
        </div>
        <div className="col">
          <div className="position-relative">
            <div className="form-titleImg">
              Revive and Refresh
              <div className="mt-5">
                <button className="btn btn-light rounded-full px-4 py-1.5 text-black text-opacity-80 hover:bg-gray-300">
                  Explore
                </button>
              </div>
            </div>
            <img
              src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_906,c_limit/af8120d1-f968-41c5-a5dc-1bc02251ca7a/resmi-nike-sitesi.jpg"
              alt="styles that will take you forward"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintain;
