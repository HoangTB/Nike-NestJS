import React, { useState, useEffect } from "react";
import "./History.css";
import { Link, useLocation } from "react-router-dom";
import { HistoryAPI, IHistory } from "../../models/History";
import { Order } from "../../models/Order";
const History: React.FC = () => {
  const [dataHistory, setDataHistory] = useState<Array<IHistory>>([]);

  const location = useLocation();

  useEffect(() => {
    const userValue = localStorage.getItem("user");
    const user = userValue ? JSON.parse(userValue) : undefined;
    Order.getOrderById(user.id).then((order: any) =>
      HistoryAPI.getHistoryIdOrder(order[0].id).then((data: any) => {
        setDataHistory(data);
      })
    );
  }, [location.pathname]);
  const reversedDataHistory = [...dataHistory].reverse();
  return (
    <div className="pb-5 form-history">
      <h1 className="mb-2 text-center">History Order</h1>
      <div className="container flex-column">
        <div className="row class-form">
          <div className="col-lg-12 p-5 bg-white rounded">
            {/* Shopping cart table */}
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="border-0 bg-light">
                      <div className="p-2 px-3 text-uppercase">Product</div>
                    </th>
                    <th scope="col" className="border-0 bg-light">
                      <div className="py-2 text-uppercase">Price</div>
                    </th>
                    <th scope="col" className="border-0 bg-light">
                      <div className="py-2 text-uppercase">Quantity</div>
                    </th>
                    <th scope="col" className="border-0 bg-light">
                      <div className="py-2 text-uppercase">Status</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reversedDataHistory &&
                    reversedDataHistory?.map((e: any, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row" className="border-0">
                            <div className="p-2">
                              <img
                                src={e.Product.image}
                                alt=""
                                width={300}
                                className="img-fluid rounded shadow-sm"
                              />
                              <div className="ml-3 d-inline-block align-middle p-3">
                                <h5 className="mb-0">
                                  {" "}
                                  <Link
                                    to={`/detail/${e.product_id}`}
                                    className="text-dark d-inline-block align-middle"
                                  >
                                    {e.Product.name}
                                  </Link>
                                </h5>
                                <span className="text-muted font-weight-normal font-italic d-block pt-2">
                                  Type: {e.Product.type}
                                </span>
                                <span className="text-muted font-weight-normal font-italic d-block pt-2">
                                  Size: {e.size_product}
                                </span>
                              </div>
                            </div>
                          </th>
                          <td className="border-0 align-middle">
                            <strong>
                              ${" "}
                              {(e.Product.price * e.quantity).toLocaleString()}
                            </strong>
                          </td>
                          <td className="border-0 align-middle">
                            <strong>{e.quantity}</strong>
                          </td>
                          <td className="border-0 align-middle">
                            <strong>
                              {e.status === 2
                                ? "Processing"
                                : e.status === 3
                                ? "Out for Delivery"
                                : e.status === 4
                                ? "Delivered"
                                : "Pending"}
                            </strong>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
