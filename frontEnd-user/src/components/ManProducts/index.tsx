import React, { useState, useEffect } from "react";
import "./ManProducts.css";
import Price from "./ManProducts-Components/Price";
import Card from "./ManProducts-Components/Card";
import Loading from "../Loading/Loading";
import { IProducts, Products } from "../../models/Product";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
const ManProducts: React.FC = ({}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [cardData, setCardData] = useState<IProducts[]>([]);
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  useEffect(() => {
    Products.searchProduct(queryParams)
      .then((product: any) => {
        setCardData(product);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [location.search]);
  const productFilter = cardData.filter((item) => item.status === 0);
  return (
    <div className="mt-4">
      {isLoading && <Loading />}
      <div className="form-product">
        <div className="list-left">
          <div className="pt-4">
            <span className="h4">All Shoes ({productFilter.length})</span>
          </div>
          <hr className="mt-4" />
          <Price />
        </div>

        <div className="list-right ">
          <div className="form-card">
            <Card productFilter={productFilter} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManProducts;
