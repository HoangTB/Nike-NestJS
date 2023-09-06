import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Login from "../../components/Modal/Login/Login";

const RequireLogin: React.FC = () => {
  const accessToken: string | null = localStorage.getItem("accessToken");
  const [exp, setExp] = useState(false);
  useEffect(() => {
    try {
      let date = new Date();
      let decode: any = jwtDecode(accessToken!);
      if (decode && decode.exp > date.getTime() / 1000) {
        return setExp(false);
      } else {
        return setExp(true);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      {exp && <Login />}
      <Outlet />
    </>
  );
};

export default RequireLogin;
