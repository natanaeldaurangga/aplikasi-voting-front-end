import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkAdmin, checkUser, checkVoter } from "../auth";

const VoterRoutes = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkUser()) {
      navigate("/login", { replace: true });
      return;
    }

    if (!checkVoter()) {
      navigate("/forbidden", { replace: true });
      return;
    }
  }, []);

  return <>{props.children}</>;
};

export default VoterRoutes;
