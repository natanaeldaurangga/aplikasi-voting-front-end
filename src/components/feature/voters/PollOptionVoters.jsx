import { Button } from "@chakra-ui/react";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const PollOptionVoters = ({ secure_id }) => {
  return (
    <div className="w-full">
      <Button
        as={Link}
        to={`/event/${secure_id}/voters`}
        colorScheme="blue"
        variant={"solid"}
      >
        <FontAwesomeIcon icon={faInfo} />
      </Button>
    </div>
  );
};

export default PollOptionVoters;
