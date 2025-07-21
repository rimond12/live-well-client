import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading  } = useAuth()
  const location = useLocation();

  if (loading) {
    return 'loading....';
  }

  if (user && user.email) {
    return children;
  }

  // Redirect to login page and preserve current location
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
