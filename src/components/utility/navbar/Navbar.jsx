import { faBars, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../../assets/avatar.png";
import RoundedImage from "../user/RoundedImage";
import UserInfo from "./UserInfo";
import {
  closeSidebar,
  closeUser,
  toggleSidebar,
  toggleUser,
} from "../../../feature/toggleUI";
import { useOutsideClick } from "@chakra-ui/react";
import { IMAGE_URL } from "../../../constants/url";

const Navbar = () => {
  const infoHidden = useSelector((state) => state.toggleUI.user);

  const dispatch = useDispatch();

  const userRef = useRef();

  const sidebarRef = useRef();

  useOutsideClick({
    ref: userRef,
    handler: () => dispatch(closeUser()),
  });

  useOutsideClick({
    ref: sidebarRef,
    handler: () => dispatch(closeSidebar()),
  });

  return (
    <div className="w-full h-20 flex justify-between bg-blue-500 items-center px-5 py-1 text-white shadow-sm shadow-black">
      <div
        ref={sidebarRef}
        className={`text-2xl cursor-pointer mr-3`}
        onClick={() => dispatch(toggleSidebar())}
      >
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div
        ref={userRef}
        className="w-auto py-1 ml-2 px-2 h-full rounded-sm text-white flex lg:gap-10 gap-2 items-center justify-end hover:bg-blue-600"
        onClick={() => dispatch(toggleUser())}
      >
        <span className="flex gap-3 items-center justify-end cursor-pointer p-2">
          <FontAwesomeIcon icon={faCaretDown} />
          <h2 className="text-base lg:text-xl truncate text-ellipsis lg:inline hidden">
            {localStorage.getItem("name")}
          </h2>
        </span>
        <RoundedImage
          img={IMAGE_URL + "/" + localStorage.getItem("userPicture")}
          name={localStorage.getItem("name")}
        />
        <UserInfo
          name={localStorage.getItem("name")}
          role={localStorage.getItem("role")}
          photo={localStorage.getItem("userPicture")}
          hidden={infoHidden}
        />
      </div>
    </div>
  );
};

export default Navbar;
