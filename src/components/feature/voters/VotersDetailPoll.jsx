import React from "react";
import { VoterService } from "../../../services/api.service";
import {
  Button,
  FormControl,
  FormLabel,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  faEdit,
  faEraser,
  faInfo,
  faTrash,
  faUndo,
  faXmark,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import AppAlertDialog from "../../utility/AlertDialog";

const VotersDetailPoll = ({
  event_id,
  username,
  name,
  role_name,
  prodi_name,
}) => {
  const alertSrv = useDisclosure();

  const unregisterFromEvent = async () => {
    const result = await VoterService.unregisterVoter(username, event_id);
    if (result.status === 200) {
      window.location.reload();
    } else {
      console.log(error);
    }
  };

  return (
    <>
      <div className="m-2">
        <div className="flex gap-5 p-2">
          <span className="font-bold mr-5 min-w-[75px]">Name</span>
          <span>{name}</span>
        </div>
        <div className="flex gap-5 p-2">
          <span className="font-bold mr-5 min-w-[75px]">Username</span>
          <span>{username}</span>
        </div>
        <div className="flex gap-5 p-2">
          <span className="font-bold mr-5 min-w-[75px]">Prodi</span>
          <span>{prodi_name}</span>
        </div>
        <div className="flex gap-5 p-2">
          <span className="font-bold mr-5 min-w-[75px]">Role</span>
          <span>{role_name}</span>
        </div>
        <div className="flex gap-5 p-2">
          <Button variant={"solid"} colorScheme="red" onClick={alertSrv.onOpen}>
            <FontAwesomeIcon icon={faEraser} />
          </Button>
        </div>
      </div>
      <AppAlertDialog
        onClose={alertSrv.onClose}
        isOpen={alertSrv.isOpen}
        variant="delete"
        action={unregisterFromEvent}
      />
    </>
  );
};

export default VotersDetailPoll;
