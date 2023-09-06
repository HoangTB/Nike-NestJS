import React, { useState, useEffect } from "react";
import "./ManProducts.css";
import Price from "./ManProducts-Components/Price";
import Card from "./ManProducts-Components/Card";
import Loading from "../Loading/Loading";
import { Products } from "../../models/Product";
const ManProducts: React.FC = ({}) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    Products.getProduct()
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <div className="mt-4">
      {isLoading && <Loading />}
      <div className="form-product">
        <div className="list-left">
          <div className="pt-4">
            <span className="h4">All Shoes </span>
          </div>
          <hr className="mt-4" />
          <Price />
        </div>

        <div className="list-right ">
          <div className="form-card">
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManProducts;
