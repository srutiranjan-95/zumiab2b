import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const token =
    localStorage.getItem("access");

  // IF NO TOKEN REDIRECT LOGIN
  if (!token) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;