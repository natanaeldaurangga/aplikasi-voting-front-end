import {
  faBullhorn,
  faCalendar,
  faSignOut,
  faUser,
  faUsers,
  faVoteYea,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Menu from "../utility/sidebar/Menu";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar, toggleSidebar } from "../../feature/toggleUI";
import voteLogo from "../../assets/voteLogo.svg";

const Sidebar = () => {
  const open = useSelector((state) => state.toggleUI.sidebar);

  const dispatch = useDispatch();

  return (
    // buat pas sm posisi si sidebarnya jadi fixed, nindih si bodynya
    <section
      className={`origin-left ${
        open
          ? "lg:w-72 w-screen px-3 lg:relative fixed"
          : "fixed sm:delay-75 w-0 lg:w-20 lg:relative lg:px-3"
      } duration-200 h-screen bg-white flex flex-col item-center pt-16 overflow-x-hidden overflow-y-scroll scrollbar-hide z-40 shadow-lg shadow-black`}
    >
      <div
        className={`grid duration-200 ${open && "delay-75"} ${
          !open && "scale-0"
        } lg:hidden w-8 h-8 absolute top-1 right-1 text-gray-600 text-lg cursor-pointer`}
        onClick={() => dispatch(closeSidebar())}
      >
        <FontAwesomeIcon icon={faX} className="place-self-center" />
      </div>

      <div
        className={`w-full max-h-[20px] rounded-md px-2 py-1 text-2xl text-blue-600 mb-16 flex items-center`}
      >
        <FontAwesomeIcon icon={faBullhorn} className="mr-3 text-4xl" />
        <span
          className={`block duration-200 ${open && "delay-75"} ${
            !open && "scale-0"
          }`}
        >
          Voting App
        </span>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <Menu icon={faCalendar} name={"Poll"} hideName={open} link={"/polls"} />
        <Menu
          icon={faUser}
          name={"Kandidat"}
          hideName={open}
          link={"/candidates"}
        />
        <Menu
          icon={faUsers}
          name={"Pemilih"}
          hideName={open}
          link={"/voters"}
        />
        <Menu
          icon={faSignOut}
          name={"Sign out"}
          hideName={open}
          link={"/logout"}
        />
      </div>
    </section>
  );
};

export default Sidebar;
