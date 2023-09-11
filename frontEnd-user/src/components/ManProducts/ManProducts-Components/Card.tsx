import React from "react";
import { Link } from "react-router-dom";
import "../ManProducts.css";
import { IProducts } from "../../../models/Product";

const Card: React.FC<any> = ({ productFilter }) => {
  return (
    <>
      {productFilter &&
        productFilter.map((e: IProducts) => {
          return (
            <div className="cursor-pointer position-relative" key={e.id}>
              <Link
                className="fa-solid fa-circle-info detail-product-detail"
                to={`/detail/${e.id}`}
              />
              <img
                className="mb-2 image-add"
                src={e.image}
                alt="..."
                style={{ width: "500px" }}
              />
              <div className="d-flex flex-column">
                {e?.new === 1 ? (
                  <span className="text-warning">New Arrival</span>
                ) : (
                  ""
                )}
                <span>{e.name}</span>
                <span className="text-muted">{e.type}</span>
                <span className="mt-2 ">{e.price} $</span>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Card;
