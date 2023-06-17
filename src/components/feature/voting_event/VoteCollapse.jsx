import {
  Button,
  Collapse,
  Flex,
  Heading,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import CandidateCard from "./CandidateCard";

const VoteCollapse = ({ polls }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack>
      <Flex
        border={"1px"}
        padding={"3"}
        rounded={"md"}
        alignItems={"center"}
        gap={5}
      >
        <Button
          variant={"solid"}
          height={"12"}
          width={"12"}
          colorScheme="green"
          rounded={"full"}
          onClick={onToggle}
        >
          <FontAwesomeIcon
            size="xl"
            icon={faPlus}
            className={`${isOpen && "rotate-45"} transition-all duration-150`}
          />
        </Button>
        <Heading size={"md"}>[NamaEvent] Pemilihan 2023-2024</Heading>
      </Flex>
      <Collapse in={isOpen}>
        <div className="w-full h-96 flex bg-slate-400 p-5 gap-5 justify-center">
          <CandidateCard />
          <CandidateCard />
        </div>
      </Collapse>
    </Stack>
  );
};

export default VoteCollapse;
