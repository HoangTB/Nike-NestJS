import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const RequireUser: React.FC = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    return (
      <>
        <Outlet />
      </>
    );
  }
  return <Navigate to={"/login"} />;
};

export default RequireUser;
