import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { VotingService } from "../../../services/api.service";
import VoteCollapse from "./VoteCollapse";

const VotePage = () => {
  const [polls, setPolls] = useState([]);
  const [isOpen, onOpen] = useState(false);

  useEffect(() => {}, []);

  return (
    <>
      <div className="p-5 w-screen overflow-y-scroll grid place-items-center">
        <Card shadow={"dark-lg"} className="w-full min-h-[600px] bg-slate-200">
          <CardHeader className="text-gray-500 rounded-t-md">
            <Heading size={"xl"} className="mb-3">
              Daftar Polling untuk anda
            </Heading>
          </CardHeader>
          <CardBody>
            {/* TODO: Lanjut bikin komponen untuk collapse transition tiap tiap polling */}
            <Stack gap={3}>
              <VoteCollapse />
              <VoteCollapse />
            </Stack>
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
      </div>
      {/* FIXME: Kenapa si komponen button tidak nempel lagi di sudut kanan bawah? */}
      <Button
        variant={"solid"}
        colorScheme="orange"
        className="animate-bounce"
        height={"24"}
        width={"24"}
        borderRadius={"full"}
        position={"absolute"}
        bottom={"0"}
        right={"10"}
        as={Link}
        to={"/logout"}
      >
        <FontAwesomeIcon icon={faSignOut} />
      </Button>
    </>
  );
};

export default VotePage;
