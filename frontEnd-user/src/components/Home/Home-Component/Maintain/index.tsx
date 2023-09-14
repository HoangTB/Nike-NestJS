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
              src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_906,c_limit/d5062dbc-5dfb-46b9-b463-44339085123f/nike-just-do-it.png"
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
              src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_906,c_limit/e49814c0-2f56-41f4-ba4a-5f2d2e550c16/nike-just-do-it.png"
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
