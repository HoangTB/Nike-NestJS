import React, { useState, useEffect } from "react";
import "./Search.css";
import { IProducts, Products } from "../../../models/Product";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";

const Search: React.FC = () => {
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const [products, setProducts] = useState<IProducts[]>();
  useEffect(() => {
    Products.searchProductName(queryParams)
      .then((product) => {
        setProducts(product);
      })
      .catch((error) => console.log(error));
  }, [location.search]);

  return (
    <div className="form-search">
      <div className="form-search-child">
        {products &&
          products.map((product, index) => {
            return (
              <div className="form-search-child-shoes" key={index}>
                <Link to={`/detail/${product.id}`}>
                  <img src={product.image} alt="..." />
                </Link>
                <p className="pt-2 name-product-search">{product.name}</p>
                <p className="grey">{product.type}</p>
                <p className="pt-3">{product.price} $</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Search;
