import React from "react";
import { Images } from "../../assets";
const NotFound: React.FC = () => {
  return (
    <div>
      <img
        src={Images.NotFound}
        style={{ width: "100%", height: "100vh", objectFit: "contain" }}
      />
    </div>
  );
};

export default NotFound;
