import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext"; // Adjust the path to your AuthContext

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Check if the user is authenticated

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/adminLogin" replace />;
  }

  // If authenticated, render the component
  return children;
};

export default PrivateRoute;
