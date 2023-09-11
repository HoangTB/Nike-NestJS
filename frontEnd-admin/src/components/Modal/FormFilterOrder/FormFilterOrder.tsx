import React, { useEffect, useState } from "react";
import { OrderAPIServer } from "../../../models/Order";
import { IOrder } from "../../../models/History";
import "./FormFilterOrder.css";
import { useNavigate } from "react-router-dom";

const FormFilterOrder: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>(); // Use a more descriptive variable name
  const [selectedOrderId, setSelectedOrderId] = useState(""); // State to store selected order ID
  const [selectedStatus, setSelectedStatus] = useState(""); // State to store selected status
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch orders when the component mounts
    OrderAPIServer.getOrder()
      .then((data: IOrder) => setOrders(data as any))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const Array = [
    "All",
    "Pending",
    "Processing",
    "Out for Delivered",
    "Delivered",
  ];
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOrderId(selectedValue); // Update selected order ID state
  };

  const handleSelectChange2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedStatus(selectedValue); // Update selected status state
  };

  const applyFilters = () => {
    // Build the URL based on selected filters
    if (selectedOrderId) {
      let queryParams = `orderID=${encodeURIComponent(selectedOrderId)}`;
      if (selectedStatus) {
        queryParams += `&status=${encodeURIComponent(selectedStatus)}`;
      }
      navigate(`/order-manager?${queryParams}`);
    }
  };

  return (
    <div className="form-control-order">
      <div className="form-control-order1">
        <p>User_Order:</p>
        <select
          className="form-control form-control-order-child"
          onChange={handleSelectChange}
          value={selectedOrderId} // Set the selected value from state
        >
          <option value="">Select an order ID</option>
          <option value="All">All</option>

          {orders &&
            orders.map((order) => (
              <option key={order.id} value={order.id}>
                {order.id}
              </option>
            ))}
        </select>
      </div>
      <div className="form-control-order2">
        <p>Status:</p>
        <select
          className="form-control form-control-order-child2"
          onChange={handleSelectChange2}
          value={selectedStatus} // Set the selected value from state
        >
          <option value="">Select a status</option>
          {Array.map((value: any) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <button onClick={applyFilters} className="btn btn-primary">
        Apply Filters
      </button>
    </div>
  );
};

export default FormFilterOrder;
