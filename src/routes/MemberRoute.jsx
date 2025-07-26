import React from "react";
import { Navigate, useLocation } from "react-router";
import useUserRole from "../hooks/useUserRole";
import useAuth from "../hooks/useAuth";
import Loading from "../Pages/Loading/Loading";

const MemberRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (authLoading || roleLoading || role === null) {
    return <Loading></Loading>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role !== "member") {
    return <Navigate to="/forbidden" state={{ from: location }} replace />;
  }

  return children;
};

export default MemberRoute;
