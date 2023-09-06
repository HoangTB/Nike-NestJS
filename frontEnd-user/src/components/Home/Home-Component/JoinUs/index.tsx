import React from "react";
import "./JoinUs.css";
const JoinUs: React.FC = () => {
  return (
    <div className="mb-5">
      <h2 className="text-2xl">Join Us</h2>
      <div className="image-wrapper mt-4">
        <div className="position-relative">
          <img
            className="d-none d-lg-block w-100"
            src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1824,c_limit/5502766a-5870-474a-a948-98a510d6c86a/resmi-nike-sitesi.jpg"
            alt="Membership"
          />

          <span className="text-in-photo">Join Nike Membership</span>
          <span className="text-in-photo-desc">
            Sign up and show your love with Nike By You.
          </span>
          <button className="button-in-photo">Join Us</button>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
