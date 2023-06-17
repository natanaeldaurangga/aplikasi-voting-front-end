import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkAdmin, checkUser } from "../auth";

const ProtectedRoutes = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkUser()) {
      navigate("/login", { replace: true });
      return;
    }

    if (!checkAdmin()) {
      navigate("/vote", { replace: true });
    }
  }, []);

  return <>{props.children}</>;
};

export default ProtectedRoutes;
