import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import "./Dashboard.css";
import { HistoryAPIServer, IHistory } from "../../models/History";
import { useSelector } from "react-redux";
// import { UserAPIServer } from "../../models/User";
const Dashboard: React.FC = () => {
  const update = useSelector((status: any) => status.update);

  const [revenue, setRevenue] = useState<IHistory[]>();
  // const [users, setUsers] = useState<IUser[]>();
  const [comboData, setComboData] = useState<any[]>([
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
  ]);

  useEffect(() => {
    HistoryAPIServer.getRevenue().then((data) => {
      setRevenue(data);
    });
    // UserAPIServer.getAllUserOrder().then((data) => {
    //   setUsers(data);
    // });
  }, [update]);

  useEffect(() => {
    if (revenue) {
      const revenueByMonth: any = {};

      revenue.forEach((e: any) => {
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
        const index = comboData.findIndex((item) => item[0] === monthLabel);

        if (index !== -1) {
          comboData[index][1] = revenueByMonth[key];
        }
      });

      setComboData([...comboData]);
    }

    // if (users) {
    //   const orderByMonth: any = {};
    //   users?.forEach((user: IUser) => {
    //     if (user.Order && user.Order.order_date) {
    //       const orderDate = new Date(user.Order.order_date);
    //       const month = orderDate.getMonth() + 1;
    //       const year = orderDate.getFullYear();
    //       const key = `${year}-${month}`;
    //       const value = users.length;
    //       if (orderByMonth[key]) {
    //         orderByMonth[key] = value;
    //       } else {
    //         orderByMonth[key] = value;
    //       }
    //       const monthLabel = `Tháng ${month}`;
    //       const index = comboData.findIndex((item) => item[0] === monthLabel);
    //       if (index !== -1) {
    //         comboData[index][2] = orderByMonth[key];
    //       }
    //     }
    //   });
    // }
  }, [revenue]);

  const options = {
    title: "Revenue Performance",
    hAxis: { titleTextStyle: { color: "#333" } },
    vAxis: { minValue: 0 },
  };

  const options2 = {
    title: "Revenue Performance",
    hAxis: { titleTextStyle: { color: "#333" } },
    vAxis: { minValue: 0 },
    legend: { position: "top", maxLines: 3 },
    colors: ["blue"],
  };

  return (
    <div className="content-user">
      <div className="table-content">
        <div className="wrapper-title">
          <h1 className="title-page">DASHBOARD-MANAGER</h1>
        </div>
        <div className="dashboard">
          <div className="chart-container">
            <Chart
              chartType="ColumnChart"
              data={comboData}
              options={options2}
              width="100%"
              height="500px"
              legendToggle
            />
          </div>
          <div className="chart-container1">
            <Chart
              chartType="PieChart"
              data={comboData}
              options={options}
              width="100%"
              height="500px"
              legendToggle
            />
            <Chart
              chartType="LineChart"
              data={comboData}
              options={options}
              width="100%"
              height="500px"
              legendToggle
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
