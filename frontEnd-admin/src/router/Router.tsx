import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DefaultLayoutLogin from "../layout/DefaultLayoutLogin/DefaultLayoutLogin";
import DefaultLayout from "../layout/DefaultLayout/DefaultLayout";
import Home from "../components/Home/Home";
import UserManager from "../components/UserManager/UserManager";
import ProductManager from "../components/ProductManager/ProductManager";
import OrderManager from "../components/OrderManager/OrderManager";
import RevenueManager from "../components/RevenueManager/RevenueManager";
import NotFound from "../pages/NotFound/NotFound";
import AdminOutlet from "../middlewares/requireAdmin";

const Router: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login-manager" />} />
        <Route path="/login-manager" element={<DefaultLayoutLogin />} />
        <Route path="/" element={<AdminOutlet />}>
          <Route path="home" element={<DefaultLayout children={<Home />} />} />
          <Route
            path="user-manager"
            element={<DefaultLayout children={<UserManager />} />}
          />

          <Route
            path="product-manager"
            element={<DefaultLayout children={<ProductManager />} />}
          />
          <Route
            path="order-manager"
            element={<DefaultLayout children={<OrderManager />} />}
          />
          <Route
            path="revenue-manager"
            element={<DefaultLayout children={<RevenueManager />} />}
          />
          <Route path="login-manager" element={<DefaultLayoutLogin />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Router;
