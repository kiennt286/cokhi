import React from "react";
import { Navigate } from "react-router-dom";
import { adminAuth } from "../../lib/adminAuth";

const AdminRouteGuard = ({ children }) => {
  const token = adminAuth.getToken();
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default AdminRouteGuard;
