import React, { useEffect } from "react";
import { logout } from "../../auth";
import { Navigate } from "react-router-dom";

const Signout = () => {
  useEffect(() => {
    logout();
  }, []);

  return <Navigate to={"/login"} />;
};

export default Signout;
