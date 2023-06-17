import { Button } from "@chakra-ui/react";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { VoterService } from "../../../services/api.service";

const UnregisteredVotersChildren = ({ event_id, username }) => {
  const onRegister = async () => {
    const result = await VoterService.registerVoter(username, event_id);
    if (result.status === 200) {
      window.location.reload();
    } else {
      console.log(result);
    }
  };

  return (
    <div className="flex gap-5">
      <Button
        variant={"outline"}
        colorScheme="blue"
        leftIcon={<FontAwesomeIcon icon={faCheckCircle} />}
        onClick={onRegister}
      >
        Daftarkan
      </Button>
    </div>
  );
};

export default UnregisteredVotersChildren;
