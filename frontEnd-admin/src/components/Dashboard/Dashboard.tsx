import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import "./Dashboard.css";
import { HistoryAPIServer, IHistory } from "../../models/History";
import { useSelector } from "react-redux";
const Dashboard: React.FC = () => {
  const update = useSelector((status: any) => status.update);

  const [revenue, setRevenue] = useState<IHistory[]>();
  const data = [
    ["Month", "Revenue ($)"],
    ["Tháng 1", 0],
    ["Tháng 2", 0],
    ["Tháng 3", 0],
    ["Tháng 4", 0],
    ["Tháng 5", 0],
    ["Tháng 6", 0],
    ["Tháng 7", 0],
    ["Tháng 8", 0],
    ["Tháng 9", 0],
    ["Tháng 10", 0],
    ["Tháng 11", 0],
    ["Tháng 12", 0],
  ];

  useEffect(() => {
    HistoryAPIServer.getRevenue().then((data) => {
      setRevenue(data);
    });
  }, [update]);
  const revenueByMonth: any = {};
  revenue?.map((e: any) => {
    const orderDate = new Date(e.order_date);
    const month = orderDate.getMonth() + 1;
    const year = orderDate.getFullYear();
    const priceTotal = e.quantity * e.Product.price;
    const revenue = priceTotal;
    const key = `${year}-${month}`;
    if (revenueByMonth[key]) {
      revenueByMonth[key] += revenue;
    } else {
      revenueByMonth[key] = revenue;
    }
    const monthLabel = `Tháng ${month}`;
    const index = data.findIndex((item) => item[0] === monthLabel);

    if (index !== -1) {
      data[index][1] = revenueByMonth[key];
    }
  });

  const options = {
    title: "Company Performance",
    hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
    vAxis: { minValue: 0 },
    legend: { position: "top", maxLines: 3 },
    colors: ["#7A7AFF"],
  };
  return (
    <div className="dashboard">
      <div className="chart-container">
        <Chart
          chartType="ColumnChart"
          data={data}
          options={options}
          width="100%"
          height="400px"
          legendToggle
        />
      </div>
    </div>
  );
};

export default Dashboard;
