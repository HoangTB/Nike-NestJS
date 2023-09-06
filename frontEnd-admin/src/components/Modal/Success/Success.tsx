import React from "react";
import "./Success.css";
import { IFormSuccess } from "../../../types/Type";
const Success: React.FC<IFormSuccess> = ({ closeSuccess }) => {
  return (
    <div className="modal2">
      <div className="modal-null2">
        <p>Successfully !</p>
        <div className="modal-null-button">
          <button onClick={() => closeSuccess!()}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Success;
