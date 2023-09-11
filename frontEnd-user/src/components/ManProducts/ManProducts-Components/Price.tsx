import React from "react";
import { Link } from "react-router-dom";

const Price: React.FC = () => {
  return (
    <div className="p-3 d-flex flex-column">
      <h4>Filter by Price</h4>
      <div className="mt-2 mt-4 cursor-pointer btn btn-light">
        <Link
          className="ml-1 m-0 btn-active"
          to="/products?type=Men%27s%20Shoes&type=Kid%27s%20Shoes&type=Woman%27s%20Shoes&minPrice=179&maxPrice=329"
        >
          179 $ - 329 $
        </Link>
      </div>
      <div className="mt-4 cursor-pointer btn btn-light">
        <Link
          className="ml-1 m-0"
          to="/products?type=Men%27s%20Shoes&type=Kid%27s%20Shoes&type=Woman%27s%20Shoes&minPrice=329&maxPrice=499"
        >
          329 $ - 499 $
        </Link>
      </div>

      <div className="mt-2 mt-4 cursor-pointer btn btn-light">
        <Link
          className="ml-1 m-0"
          to="/products?type=Men%27s%20Shoes&type=Kid%27s%20Shoes&type=Woman%27s%20Shoes&minPrice=499&maxPrice=1000"
        >
          Above 499 $
        </Link>
      </div>
    </div>
  );
};

export default Price;
