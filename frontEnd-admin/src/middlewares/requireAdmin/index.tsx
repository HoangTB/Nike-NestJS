import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminOutlet: React.FC = () => {
  const adminData = localStorage.getItem("admin");
  const parsedAdminData = adminData ? JSON.parse(adminData) : null;

  const hasToken = parsedAdminData && parsedAdminData.role === 2;

  if (hasToken) {
    return (
      <>
        <Outlet />
      </>
    );
  }

  return <Navigate to={"/login-manager"} />;
};

export default AdminOutlet;
