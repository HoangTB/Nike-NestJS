import React from "react";
import "./FormFilter.css";

import { useNavigate } from "react-router-dom";
const FormFilter: React.FC = () => {
  const Array = [
    "All",
    "Price A - Z",
    "Price Z - A",
    "Men's Shoes",
    "Woman's Shoes",
    "Kid's Shoes",
    "Quantity Inventory < 5",
  ];
  const navigate = useNavigate();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    navigate(`/product-manager?type=${encodeURIComponent(selectedValue)}`);
  };

  return (
    <>
      <select
        className="form-control form-control-sm"
        onChange={handleSelectChange}
      >
        <option value="">Select a Filter</option>
        {Array.map((value, index) => {
          return (
            <option key={index} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default FormFilter;
