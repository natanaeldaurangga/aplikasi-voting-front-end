import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkAdmin, checkUser } from "../auth";

const AdminRoutes = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkUser()) {
      navigate("/login", { replace: true });
      return;
    }

    if (!checkAdmin()) {
      navigate("/forbidden", { replace: true });
    }
  }, []);

  return <>{props.children}</>;
};

export default AdminRoutes;
