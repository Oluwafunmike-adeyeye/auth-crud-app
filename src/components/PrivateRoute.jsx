import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element, ...rest }) => {
  // Access authentication state from Redux store
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  return isAuthenticated ? (
    // Render the element if authenticated
    React.cloneElement(element, { ...rest })
  ) : (
    // Redirect to login page if not authenticated
    <Navigate to="/" state={{ from: location }} />
  );
};

export default PrivateRoute;
