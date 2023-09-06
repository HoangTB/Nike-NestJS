import React from "react";
import "./Confirm-Delete.css";
import { ProductsServer } from "../../../models/Product";
import { IConfirmDeleteProps } from "../../../types/Type";
const ConfirmDelete: React.FC<IConfirmDeleteProps> = ({
  handleCancel,
  idDelete,
  handleLoading,
}) => {
  const handleSuccess = async () => {
    if (idDelete !== null) {
      await ProductsServer.deleteProduct(idDelete)

        .then(() => {
          handleLoading!();
          handleCancel!();
        })
        .catch((error) => {
          console.log(error);
          handleLoading!();
          handleCancel!();
        });
    }
  };
  return (
    <div className="modal">
      <div className="modal-null1">
        <p>Do you want to delete this product?</p>
        <div className="modal-null-button">
          <button onClick={() => handleSuccess()}>Yes</button>{" "}
          <button onClick={() => handleCancel!()}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
