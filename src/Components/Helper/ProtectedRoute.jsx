import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

const ProtectedRoute = ({ children }) => {
  const { login } = useContext(UserContext);

  switch (login) {
    case true:
      return children;
    case false:
      return <Navigate to="/login" />;
    default:
      return null;
  }
};

export default ProtectedRoute;
