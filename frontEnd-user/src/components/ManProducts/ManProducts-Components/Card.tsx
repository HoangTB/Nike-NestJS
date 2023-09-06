import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../ManProducts.css";
import { IProducts, Products } from "../../../models/Product";
import { useSelector } from "react-redux";
const Card: React.FC = () => {
  const [cardData, setCardData] = useState([]);
  const sidebarValue = useSelector((state: any) => state.sidebar);

  const params = useParams();
  const type = params.type!.split("&");
  console.log(type);
  useEffect(() => {
    Products.searchProduct({ type: type }).then((product: any) => {
      setCardData(product);
    });
  }, [location.pathname]);

  let filteredData = cardData; // Khởi tạo dữ liệu lọc bằng dữ liệu gốc

  if (sidebarValue) {
    filteredData = cardData.filter(
      (o: any) =>
        (sidebarValue.min === undefined || o.price >= sidebarValue.min) &&
        (sidebarValue.max === undefined || o.price <= sidebarValue.max)
    );
  }

  console.log(filteredData);

  return (
    <>
      {filteredData &&
        filteredData.map((e: IProducts) => {
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
