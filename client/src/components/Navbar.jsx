import React from "react";
import { Link } from "react-router-dom";
import { FaBus } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center px-20 py-4 bg-slate-800">
      <Link
        to="/"
        className="text-2xl font-bold text-red-400 flex gap-2 items-center"
      >
        <FaBus />
        BusTicket.com
      </Link>

      <Link
        to="/Authentication"
        className="text-white hover:text-gray-700 hover:bg-gray-300 px-4 py-2 rounded font-semibold"
      >
        Sign In
      </Link>
      <Link
        to="/AdminDashboard"
        className="text-white hover:text-gray-700 hover:bg-gray-300 px-4 py-2 rounded font-semibold"
      >
        Admin
      </Link>
    </header>
  );
};

export default Navbar;
