import React, { useState } from "react";
import { HistoryAPIServer, IDate, IHistory } from "../../models/History";
import "./RevenueManager.css";
const RevenueManager: React.FC = () => {
  const [date, setDate] = useState("");
  const [history, setHistory] = useState<Array<IHistory>>([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (date) {
      const dataMonth = date.slice(5, 7);
      const dataYear = date.slice(0, 4);
      const result: IDate | any = {
        dataMonth: dataMonth,
        dataYear: dataYear,
      };

      await HistoryAPIServer.getHistoryWithMonth(result).then((data) =>
        setHistory(data)
      );
    }
  };

  const priceTotal = history?.map((h: any) => h.quantity * h.Product.price);

  const revenue = priceTotal?.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const totalQuantity = history?.reduce(
    (total, h) => total + (h.quantity || 0),
    0
  );

  return (
    <div className="content-user">
      <div className="table-content">
        <div className="wrapper-title">
          <h1 className="title-page">REVENUE-MANAGER</h1>
        </div>
        <div className="bootstrap-iso">
          <div className="container-fluid">
            <div className="row">
              <div className="">
                <form className="post-date" onSubmit={handleSubmit}>
                  <div>
                    <input
                      className="form-control"
                      id="month"
                      name="month"
                      type="month"
                      min="yyyy-01"
                      max="yyyy-12"
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <button
                      className="btn btn-primary "
                      name="submit"
                      type="submit"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th style={{ fontSize: "25px" }}>YEAR</th>
              <th style={{ fontSize: "25px" }}>MONTH</th>
              <th style={{ fontSize: "25px" }}>QUANTITY</th>
              <th style={{ fontSize: "25px" }}>REVENUE</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 ? (
              <tr>
                <td style={{ fontSize: "25px" }}>
                  {history[0]
                    ? String(history[0]?.order_date!).slice(0, 4)
                    : ""}
                </td>
                <td style={{ fontSize: "25px" }}>
                  {history[0]
                    ? String(history[0]?.order_date!).slice(5, 7)
                    : ""}
                </td>
                <td style={{ fontSize: "25px" }}>
                  {totalQuantity ? totalQuantity : ""}
                </td>
                <td style={{ fontSize: "25px" }}>
                  {" "}
                  {revenue ? "$" + " " + revenue.toLocaleString() : ""}
                </td>
              </tr>
            ) : (
              <tr>
                <td className="no-data" colSpan={4}>
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueManager;
