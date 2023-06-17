import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Menu = ({ name, icon, hideName, link }) => {
  return (
    <Link to={link}>
      <div
        className={`w-full h-14 rounded-sm px-3 py-1 text-xl hover:bg-gray-300 duration-100 text-gray-500 cursor-pointer flex gap-4 items-center`}
      >
        <FontAwesomeIcon icon={icon} />
        <span
          className={`block ${open && "delay-75"} duration-200 ${
            !hideName && "scale-0"
          }`}
        >
          {name}
        </span>
      </div>
    </Link>
  );
};

// TODO: coba jest untuk testing
export default Menu;
