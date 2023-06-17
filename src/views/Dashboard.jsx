import React, { useEffect } from "react";
import Sidebar from "../components/layouts/Sidebar";
import Body from "../components/layouts/Body";
import { checkUser } from "../auth";
import { useNavigate } from "react-router-dom";
import { replace } from "formik";

const Dashboard = (props) => {
  return (
    <div className="overflow-x-hidden overflow-y-hidden flex font-roboto">
      <Sidebar />
      <Body>{props.children}</Body>
    </div>
  );
};

export default Dashboard;
