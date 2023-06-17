import React, { Suspense } from "react";
import Dashboard from "./views/Dashboard";
import Body from "./components/layouts/Body";
import {
  BrowserRouter,
  Route,
  Router,
  RouterProvider,
  Routes,
} from "react-router-dom";
import router from "./routes";
import Signin from "./views/auth/Signin";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const eventId = useSelector((state) => state.activeEvent.eventId);
  const dispatch = useDispatch();

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
