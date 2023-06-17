import React, { useEffect, useRef, useState } from "react";
import RoundedImage from "../user/RoundedImage";
import { Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE_URL } from "../../../constants/url";

const UserInfo = ({ hidden, photo, name, role }) => {
  // TODO: image udah beres tinggal beresin name, role, username
  return (
    <div
      className={`${
        hidden && "origin-top-right lg:origin-top scale-0"
      } min-h-[24rem] lg:w-96 w-72 bg-white rounded-md absolute top-24 right-5 duration-200 z-30 flex flex-col justify-between pt-10 pb-5 px-2 shadow-lg shadow-black`}
    >
      <div className={`flex flex-col gap-5 items-center`}>
        <RoundedImage img={IMAGE_URL + "/" + photo} size={"2xl"} />
        <span className="text-2xl text-gray-600">{name}</span>
        <span className="text-base text-gray-400">{role}</span>
      </div>
      <div className={`flex justify-around px-2 h-10 w-full`}>
        <Button leftIcon={<FontAwesomeIcon icon={faInfo} />} colorScheme="blue">
          Profile
        </Button>
        <Button
          as={Link}
          to={"/logout"}
          leftIcon={<FontAwesomeIcon icon={faSignOut} />}
          colorScheme="blue"
          variant={"outline"}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserInfo;
