import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const LandingPage = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="w-full bg-white">
        <Navbar />
      </div>
      <Outlet />
    </div>
  );
};

export default LandingPage;
