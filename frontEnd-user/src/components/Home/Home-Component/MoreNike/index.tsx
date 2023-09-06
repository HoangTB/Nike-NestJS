import React from "react";
import "./MoreNike.css";
const MoreNike: React.FC = () => {
  return (
    <div className="mt-5 mb-5">
      <span className="h3">More from Nike</span>
      <div className="row row-cols-1 row-cols-md-3 mt-4">
        <div className="col">
          <div className="position-relative">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/projectshoes-cf747.appspot.com/o/pexels-ryan-hiebendahl-9801650.jpg?alt=media&token=cd65c720-06ef-4849-b9a1-db3c8a261aa2"
              alt="More With Nike"
              className="img-fluid"
            />
            <button className="button-in-photo-more btn btn-secondary">
              Men
            </button>
          </div>
        </div>
        <div className="col">
          <div className="position-relative">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/projectshoes-cf747.appspot.com/o/pexels-cottonbro-studio-4570754.jpg?alt=media&token=4a04e8be-e47b-41c6-b46b-d7ecd5bec656"
              alt="More With Nike"
              className="img-fluid"
            />
            <button className="button-in-photo-more btn btn-secondary">
              Women
            </button>
          </div>
        </div>
        <div className="col">
          <div className="position-relative">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/projectshoes-cf747.appspot.com/o/pexels-amina-filkins-5559986.jpg?alt=media&token=36837fd5-396c-4164-b949-648f6eaa8d3d"
              alt="More With Nike"
              className="img-fluid"
            />
            <button className="button-in-photo-more btn btn-secondary">
              Kids
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreNike;
