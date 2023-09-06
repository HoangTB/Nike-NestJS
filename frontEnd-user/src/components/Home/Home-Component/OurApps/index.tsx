import React from "react";

const OurApps: React.FC = () => {
  return (
    <div className="mb-5">
      <span className="h3">Explore Our Apps</span>
      <div className="row row-cols-1 row-cols-md-2 mt-4">
        <div className="col cursor-pointer">
          <div className="position-relative">
            <img
              src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_906,c_limit/6b68a809-e5fa-4228-85ef-e0db636ce083/resmi-nike-sitesi.jpg"
              alt="our apps"
              className="img-fluid"
            />
            <div className="form-titleImg">
              <span className="text-white">Nike App</span>
              <div className="button-apps mt-5">
                <button className="btn btn-light px-4 py-1.5 rounded-full tracking-wide">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col cursor-pointer">
          <div className="position-relative">
            <img
              src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_906,c_limit/25ab408d-6697-4b17-a80f-47aeeaa6eb32/resmi-nike-sitesi.jpg"
              alt="our apps"
              className="img-fluid"
            />
            <div className="form-titleImg">
              <span className="text-white">Nike Run Club App</span>
              <div className="button-apps mt-5">
                <button className="btn btn-light px-4 py-1.5 rounded-full tracking-wide">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurApps;
