import React, { useState } from "react";
import { HistoryAPIServer, IHistory } from "../../models/History";

const RevenueManager: React.FC = () => {
  const [history, setHistory] = useState<Array<IHistory>>([]);

  const handleChangeMonth = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dataMonth: string = e.target.value;
    await HistoryAPIServer.getHistoryWithMonth({ dataMonth } as any).then(
      (dataMonth) => setHistory(dataMonth)
    );
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
        <select
          className="form-control"
          style={{ width: "100px" }}
          onChange={(e) => handleChangeMonth(e)}
        >
          <option value="01">Month</option>
          <option value="01">01</option>
          <option value="02">02</option>
          <option value="03">03</option>
          <option value="04">04</option>
          <option value="05">05</option>
          <option value="06">06</option>
          <option value="07">07</option>
          <option value="08">08</option>
          <option value="09">09</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
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
            <tr>
              <td style={{ fontSize: "25px" }}>
                {history[0] ? String(history[0]?.order_date!).slice(0, 4) : ""}
              </td>
              <td style={{ fontSize: "25px" }}>
                {history[0] ? String(history[0]?.order_date!).slice(5, 7) : ""}
              </td>
              <td style={{ fontSize: "25px" }}>
                {totalQuantity ? totalQuantity : ""}
              </td>
              <td style={{ fontSize: "25px" }}>
                {" "}
                {revenue ? "$" + " " + revenue.toLocaleString() : ""}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueManager;
