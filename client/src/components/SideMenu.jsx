import React, { useEffect, useState } from "react";
import {
  IoAddCircleOutline,
} from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const MenuItems = [
  
  {
    name: "Add New Bus",
    element: <IoAddCircleOutline className="w-7 h-7" id="2" />,
    link: "/AdminDashboard/AddNewBus",
    active: false,
    id: "1",
  },
  
  
];

const SideMenu = () => {
  const [menu, setMenu] = useState(MenuItems);
  const location = useLocation();

  const handleClick = (e) => {
    const id = e.target.id;
    const newMenu = menu.map((item) => {
      if (item.id === id) {
        item.active = true;
      } else {
        item.active = false;
      }
      return item;
    });
    setMenu(newMenu);
  };

  useEffect(() => {
    const newMenu = menu.map((item) => {
      if (item.link === location.pathname) {
        item.active = true;
      } else {
        item.active = false;
      }
      return item;
    });
    setMenu(newMenu);
  }, [location]);

  return (
    <div className="mt-0 w-[10rem] py-2 px-1 flex flex-col items-center ">
      <div className="w-full flex flex-col px-1 rounded-lg border border-gray-300">
        {menu.map((item, index) => (
          <Link
            key={index}
            id={item.id}
            to={item.link}
            className={`w-full flex flex-col items-center px-4 py-3 rounded-lg cursor-pointer hover:bg-red-50 hover:text-red-500 ${
              item.active ? "bg-red-50 text-red-500" : ""
            }`}
            onClick={handleClick}
          >
            <div id={item.id}>{item.element}</div>

            <span id={item.id} className="text-center text-sm">
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
