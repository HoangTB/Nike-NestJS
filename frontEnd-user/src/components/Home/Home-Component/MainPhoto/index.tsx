import React from "react";
import HeaderMain from "./HeaderMain";
import "./MainPhoto.css";
const MainPhoto: React.FC = () => {
  return (
    <div className="main">
      <img
        className="d-none d-lg-block d-xl-block d-md-block"
        src="https://firebasestorage.googleapis.com/v0/b/projectshoes-cf747.appspot.com/o/soc_usa_jerseys_16x9.jpg?alt=media&token=9c0e026b-b184-42d0-a675-27bffd4a8d24"
        alt="mainphoto"
      />
      <HeaderMain />
    </div>
  );
};

export default MainPhoto;
