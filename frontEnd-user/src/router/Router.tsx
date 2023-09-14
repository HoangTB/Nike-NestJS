import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound";
import DefaultLayout from "../layout/DefaultLayout/DefaultLayout";
import Home from "../components/Home";
import LoginLayout from "../layout/LoginLayout/LoginLayout";
import Register from "../components/Register";
import ManProducts from "../components/ManProducts";
import Detail from "../components/Detail/Detail";
import Favorites from "../components/Favorites/Favorites";
import Cart from "../components/Cart/Cart";
import Payment from "../components/Payment/Payment";
import History from "../components/History/History";
import Profiles from "../components/Profiles/Profiles";
import RequireLogin from "../middlewares/requireLogin";
import RequireUser from "../middlewares/requireUser";

const Router: React.FC = () => {
  // const [filteredOptions, setFilteredOptions] = useState<
  //   Array<IProducts> | undefined
  // >([]);
  // const onFilteredOptionsApp = (filteredOptions: IProducts[] | undefined) => {
  //   setFilteredOptions(filteredOptions);
  // };
  return (
    <Routes>
      <Route path="/login" element={<LoginLayout children={<Register />} />} />
      <Route element={<RequireLogin />}>
        <Route path="/" element={<Navigate to="/home" />} index />
        <Route path="/home" element={<DefaultLayout children={<Home />} />} />
        <Route
          path="/detail/:id"
          element={<DefaultLayout children={<Detail />} />}
        />
        <Route
          path="/products"
          element={<DefaultLayout children={<ManProducts />} />}
        />
        <Route element={<RequireUser />}>
          <Route
            path="/favorites"
            element={<DefaultLayout children={<Favorites />} />}
          />
          <Route path="/cart" element={<DefaultLayout children={<Cart />} />} />
          <Route
            path="/payment"
            element={<DefaultLayout children={<Payment />} />}
          />
          <Route
            path="/profiles"
            element={<DefaultLayout children={<Profiles />} />}
          />
          <Route
            path="/history"
            element={<DefaultLayout children={<History />} />}
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
