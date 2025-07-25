import React from "react";

import { Navigate, useLocation } from "react-router";
import useUserRole from "../hooks/useUserRole";
import useAuth from "../hooks/useAuth";

const MemberRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const {role, roleLoading} = useUserRole(); // hook return টা array হিসেবে ধরো
  const location = useLocation();

  if (authLoading || roleLoading || role === null) {
    return <div>Loading...</div>;
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
